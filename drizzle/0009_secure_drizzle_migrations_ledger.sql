ALTER TABLE public.__drizzle_migrations ENABLE ROW LEVEL SECURITY;
--> statement-breakpoint
REVOKE ALL PRIVILEGES ON TABLE public.__drizzle_migrations FROM PUBLIC;
--> statement-breakpoint
DO $$
DECLARE
  api_role text;
BEGIN
  FOREACH api_role IN ARRAY ARRAY['anon', 'authenticated', 'service_role']
  LOOP
    IF EXISTS (SELECT 1 FROM pg_roles WHERE rolname = api_role) THEN
      EXECUTE format(
        'REVOKE ALL PRIVILEGES ON TABLE public.__drizzle_migrations FROM %I',
        api_role
      );
    END IF;
  END LOOP;
END
$$;
