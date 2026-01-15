-- ============================================
-- Travesías Uruguay - Supabase Database Setup
-- ============================================
-- This script creates all necessary tables and security policies
-- Run this in your Supabase SQL Editor

-- ============================================
-- 1. EVENTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS events (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    date TEXT NOT NULL,
    location TEXT NOT NULL,
    description TEXT NOT NULL DEFAULT '',
    distance TEXT NOT NULL DEFAULT '',
    image_url TEXT,
    registration_link TEXT,
    manual_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 2. ANNOUNCEMENTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS announcements (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    content TEXT NOT NULL,
    date TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 3. SITE LINKS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS site_links (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    url TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('pdf', 'external', 'social')),
    description TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- ENABLE ROW LEVEL SECURITY (RLS)
-- ============================================
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_links ENABLE ROW LEVEL SECURITY;

-- ============================================
-- RLS POLICIES - PUBLIC READ ACCESS
-- ============================================

-- Events: Anyone can read
CREATE POLICY "Public read access for events"
ON events FOR SELECT
USING (true);

-- Announcements: Anyone can read
CREATE POLICY "Public read access for announcements"
ON announcements FOR SELECT
USING (true);

-- Site Links: Anyone can read
CREATE POLICY "Public read access for site_links"
ON site_links FOR SELECT
USING (true);

-- ============================================
-- RLS POLICIES - AUTHENTICATED WRITE ACCESS
-- ============================================

-- Events: Authenticated users can insert
CREATE POLICY "Authenticated users can insert events"
ON events FOR INSERT
TO authenticated
WITH CHECK (true);

-- Events: Authenticated users can update
CREATE POLICY "Authenticated users can update events"
ON events FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- Events: Authenticated users can delete
CREATE POLICY "Authenticated users can delete events"
ON events FOR DELETE
TO authenticated
USING (true);

-- Announcements: Authenticated users can insert
CREATE POLICY "Authenticated users can insert announcements"
ON announcements FOR INSERT
TO authenticated
WITH CHECK (true);

-- Announcements: Authenticated users can update
CREATE POLICY "Authenticated users can update announcements"
ON announcements FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- Announcements: Authenticated users can delete
CREATE POLICY "Authenticated users can delete announcements"
ON announcements FOR DELETE
TO authenticated
USING (true);

-- Site Links: Authenticated users can insert
CREATE POLICY "Authenticated users can insert site_links"
ON site_links FOR INSERT
TO authenticated
WITH CHECK (true);

-- Site Links: Authenticated users can update
CREATE POLICY "Authenticated users can update site_links"
ON site_links FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- Site Links: Authenticated users can delete
CREATE POLICY "Authenticated users can delete site_links"
ON site_links FOR DELETE
TO authenticated
USING (true);

-- ============================================
-- CREATE INDEXES FOR PERFORMANCE
-- ============================================
CREATE INDEX IF NOT EXISTS idx_events_date ON events(date);
CREATE INDEX IF NOT EXISTS idx_announcements_date ON announcements(date);
CREATE INDEX IF NOT EXISTS idx_site_links_type ON site_links(type);
