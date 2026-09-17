-- ============================================================================
-- Ebenezer Streaming House LTD — Initial schema
-- Apply this file in the Supabase Dashboard > SQL Editor for project
-- bctxvidqxuabfikgdqqn (region/database as configured).
-- ============================================================================

-- ---------------------------------------------------------------------------
-- Helper: trigger function to keep updated_at fresh
-- ---------------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ---------------------------------------------------------------------------
-- Helper: is the current user an admin?
-- ---------------------------------------------------------------------------
create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1
    from public.user_roles ur
    where ur.user_id = auth.uid()
      and ur.role = 'admin'
  );
$$;

grant execute on function public.is_admin() to anon, authenticated, service_role;

-- ---------------------------------------------------------------------------
-- profiles
-- ---------------------------------------------------------------------------
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text,
  email text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger set_updated_at_profiles
  before update on public.profiles
  for each row execute function public.set_updated_at();

alter table public.profiles enable row level security;

create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

create policy "Admins can manage all profiles"
  on public.profiles for all
  using (public.is_admin())
  with check (public.is_admin());

-- ---------------------------------------------------------------------------
-- user_roles (admin / viewer)
-- ---------------------------------------------------------------------------
create table if not exists public.user_roles (
  user_id uuid primary key references auth.users (id) on delete cascade,
  role text not null default 'viewer' check (role in ('admin', 'viewer')),
  created_at timestamptz not null default now()
);

alter table public.user_roles enable row level security;

create policy "Admins can manage roles"
  on public.user_roles for all
  using (public.is_admin())
  with check (public.is_admin());

-- ---------------------------------------------------------------------------
-- projects
-- ---------------------------------------------------------------------------
create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  short_description text,
  full_description text,
  category text,
  client_name text,
  project_date date,
  location text,
  services_provided text[] not null default '{}',
  cover_image text,
  video_url text,
  featured boolean not null default false,
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists projects_published_idx on public.projects (published);
create index if not exists projects_featured_idx on public.projects (featured);
create index if not exists projects_category_idx on public.projects (category);
create index if not exists projects_slug_idx on public.projects (slug);

create trigger set_updated_at_projects
  before update on public.projects
  for each row execute function public.set_updated_at();

alter table public.projects enable row level security;

create policy "Public can read published projects"
  on public.projects for select
  using (published = true);

create policy "Admins can manage projects"
  on public.projects for all
  using (public.is_admin())
  with check (public.is_admin());

-- ---------------------------------------------------------------------------
-- project_media
-- ---------------------------------------------------------------------------
create table if not exists public.project_media (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects (id) on delete cascade,
  type text not null default 'image' check (type in ('image', 'video', 'audio')),
  url text not null,
  alt text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists project_media_project_idx on public.project_media (project_id, sort_order);

alter table public.project_media enable row level security;

create policy "Public can read media of published projects"
  on public.project_media for select
  using (
    exists (
      select 1 from public.projects p
      where p.id = public.project_media.project_id
        and p.published = true
    )
  );

create policy "Admins can manage project media"
  on public.project_media for all
  using (public.is_admin())
  with check (public.is_admin());

-- ---------------------------------------------------------------------------
-- gallery_items
-- ---------------------------------------------------------------------------
create table if not exists public.gallery_items (
  id uuid primary key default gen_random_uuid(),
  title text,
  caption text,
  image_url text not null,
  category text,
  featured boolean not null default false,
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists gallery_items_published_idx on public.gallery_items (published);
create index if not exists gallery_items_category_idx on public.gallery_items (category);

create trigger set_updated_at_gallery_items
  before update on public.gallery_items
  for each row execute function public.set_updated_at();

alter table public.gallery_items enable row level security;

create policy "Public can read published gallery items"
  on public.gallery_items for select
  using (published = true);

create policy "Admins can manage gallery items"
  on public.gallery_items for all
  using (public.is_admin())
  with check (public.is_admin());

-- ---------------------------------------------------------------------------
-- contact_submissions
-- ---------------------------------------------------------------------------
create table if not exists public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  subject text,
  message text not null,
  is_read boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists contact_submissions_read_idx on public.contact_submissions (is_read);

alter table public.contact_submissions enable row level security;

create policy "Public can submit contact messages"
  on public.contact_submissions for insert
  with check (true);

create policy "Admins can read contact messages"
  on public.contact_submissions for select
  using (public.is_admin());

create policy "Admins can update contact messages"
  on public.contact_submissions for update
  using (public.is_admin())
  with check (public.is_admin());

create policy "Admins can delete contact messages"
  on public.contact_submissions for delete
  using (public.is_admin());

-- ---------------------------------------------------------------------------
-- booking_requests
-- ---------------------------------------------------------------------------
create table if not exists public.booking_requests (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  company text,
  email text not null,
  phone text not null,
  service text,
  event_type text,
  event_date date,
  location text,
  audience integer,
  budget text,
  requirements text,
  message text,
  status text not null default 'pending'
    check (status in ('pending', 'contacted', 'confirmed', 'completed', 'cancelled')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists booking_requests_status_idx on public.booking_requests (status);
create index if not exists booking_requests_created_idx on public.booking_requests (created_at desc);

create trigger set_updated_at_booking_requests
  before update on public.booking_requests
  for each row execute function public.set_updated_at();

alter table public.booking_requests enable row level security;

create policy "Public can submit booking requests"
  on public.booking_requests for insert
  with check (true);

create policy "Admins can read booking requests"
  on public.booking_requests for select
  using (public.is_admin());

create policy "Admins can update booking requests"
  on public.booking_requests for update
  using (public.is_admin())
  with check (public.is_admin());

create policy "Admins can delete booking requests"
  on public.booking_requests for delete
  using (public.is_admin());

-- ---------------------------------------------------------------------------
-- Signup: create a profile row whenever a new auth user is created
-- ---------------------------------------------------------------------------
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'full_name', new.email)
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------------------------------------------------------------------------
-- Storage buckets (public read, admin writes)
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values
  ('project-covers', 'project-covers', true),
  ('project-media', 'project-media', true),
  ('gallery-images', 'gallery-images', true)
on conflict (id) do nothing;

-- Public read on all three buckets
create policy "Public read project-covers"
  on storage.objects for select
  using (bucket_id = 'project-covers');

create policy "Public read project-media"
  on storage.objects for select
  using (bucket_id = 'project-media');

create policy "Public read gallery-images"
  on storage.objects for select
  using (bucket_id = 'gallery-images');

-- Admin-only writes on all three buckets
create policy "Admins write project-covers"
  on storage.objects for insert
  with check (bucket_id = 'project-covers' and public.is_admin());

create policy "Admins write project-media"
  on storage.objects for insert
  with check (bucket_id = 'project-media' and public.is_admin());

create policy "Admins write gallery-images"
  on storage.objects for insert
  with check (bucket_id = 'gallery-images' and public.is_admin());

create policy "Admins update project-covers"
  on storage.objects for update
  using (bucket_id = 'project-covers' and public.is_admin())
  with check (bucket_id = 'project-covers' and public.is_admin());

create policy "Admins update project-media"
  on storage.objects for update
  using (bucket_id = 'project-media' and public.is_admin())
  with check (bucket_id = 'project-media' and public.is_admin());

create policy "Admins update gallery-images"
  on storage.objects for update
  using (bucket_id = 'gallery-images' and public.is_admin())
  with check (bucket_id = 'gallery-images' and public.is_admin());

create policy "Admins delete project-covers"
  on storage.objects for delete
  using (bucket_id = 'project-covers' and public.is_admin());

create policy "Admins delete project-media"
  on storage.objects for delete
  using (bucket_id = 'project-media' and public.is_admin());

create policy "Admins delete gallery-images"
  on storage.objects for delete
  using (bucket_id = 'gallery-images' and public.is_admin());

-- ---------------------------------------------------------------------------
-- Grants (belt and braces for the anon / authenticated roles)
-- ---------------------------------------------------------------------------
grant usage on schema public to anon, authenticated;
grant usage on schema storage to anon, authenticated;

grant select on public.profiles to anon, authenticated;
grant update on public.profiles to authenticated;
grant select on public.user_roles to authenticated;

grant select on public.projects to anon, authenticated;
grant insert, update, delete on public.projects to authenticated;
grant select on public.project_media to anon, authenticated;
grant insert, update, delete on public.project_media to authenticated;
grant select on public.gallery_items to anon, authenticated;
grant insert, update, delete on public.gallery_items to authenticated;

grant insert on public.contact_submissions to anon, authenticated;
grant select, update, delete on public.contact_submissions to authenticated;

grant insert on public.booking_requests to anon, authenticated;
grant select, update, delete on public.booking_requests to authenticated;

-- ---------------------------------------------------------------------------
-- OPTIONAL: Grant admin to the first signup.
-- After creating the admin account at /admin/login, run:
--
--   insert into public.user_roles (user_id, role)
--   select id, 'admin' from auth.users where email = 'you@example.com'
--   on conflict (user_id) do update set role = 'admin';
-- ===========================================================================