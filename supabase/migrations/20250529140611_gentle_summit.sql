/*
  # Fix newsletter table RLS policies

  1. Changes
    - Drop existing RLS policies for newsletter table
    - Create new policies that properly allow:
      - Insert access for both anonymous and authenticated users
      - Select access for authenticated users only
  
  2. Security
    - Maintains security by keeping read access restricted
    - Allows public write access for newsletter subscriptions
*/

-- Drop existing policies
DROP POLICY IF EXISTS "No public read access for newsletter" ON public.newsletter;
DROP POLICY IF EXISTS "Public insert access for newsletter" ON public.newsletter;

-- Create new policies
CREATE POLICY "Enable read access for authenticated users only"
ON public.newsletter
FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Enable insert access for everyone"
ON public.newsletter
FOR INSERT
TO anon, authenticated
WITH CHECK (true);