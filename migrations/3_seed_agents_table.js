/* eslint-disable @typescript-eslint/no-unused-vars */
exports.up = pgm => {
  pgm.sql(`
    INSERT INTO agents (id, name, capabilities, historical_performance, availability, image_url)
    VALUES 
      ('11111111-1111-1111-1111-111111111111', 'SEO Writer', 'Natural language processing, sentiment analysis', 0.85, true, 'https://example.com/seo-writer.jpg'),
          ('22222222-2222-2222-2222-222222222222', 'Data Analyst', 'Data analysis, pattern recognition, anomaly detection', 0.78, true, 'https://example.com/data-analyst.jpg'),
          ('33333333-3333-3333-3333-333333333333', 'Image Reviewer', 'Image recognition, object detection', 0.92, true, 'https://example.com/image-reviewer.jpg'),
          ('44444444-4444-4444-4444-444444444444', 'Audio Tasks', 'Speech recognition, voice synthesis', 0.65, true, 'https://example.com/audio-tasks.jpg'),
          ('55555555-5555-5555-5555-555555555555', 'Personalized Shopper', 'Recommendation systems, personalization', 0.88, false, 'https://example.com/personalized-shopper.jpg')
  `);
};

exports.down = pgm => {
  pgm.sql(`
    DELETE FROM agents 
    WHERE id IN (
      '11111111-1111-1111-1111-111111111111',
      '22222222-2222-2222-2222-222222222222',
      '33333333-3333-3333-3333-333333333333',
      '44444444-4444-4444-4444-444444444444',
      '55555555-5555-5555-5555-555555555555'
    )
  `);
};