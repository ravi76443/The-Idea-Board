-- Create the ideas table
CREATE TABLE IF NOT EXISTS ideas (
    id SERIAL PRIMARY KEY,
    text VARCHAR(280) NOT NULL,
    votes INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_ideas_votes ON ideas(votes DESC);
CREATE INDEX IF NOT EXISTS idx_ideas_created ON ideas(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_ideas_votes_created ON ideas(votes DESC, created_at DESC);

-- Insert some sample data
INSERT INTO ideas (text, votes) VALUES 
    ('Build a mobile app that helps people find local events happening today', 15),
    ('Create a browser extension that blocks distracting websites during work hours', 12),
    ('Develop a platform for sharing and discovering unique travel destinations', 8),
    ('Design a tool that automates the creation of social media posts for small businesses', 5),
    ('Build a community-driven marketplace for trading vintage collectibles', 3),
    ('Create a fitness tracker that focuses on adventure sports like rock climbing', 7),
    ('Develop an app that helps people learn new languages through music lyrics', 9),
    ('Design a platform for connecting pet owners with local pet services', 4),
    ('Build a tool that helps small restaurants manage online orders more efficiently', 6),
    ('Create a social network for sharing and discovering local art and crafts', 2)
ON CONFLICT DO NOTHING;
