import re

with open('/home/user/workspace/story-quest/app.js', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update the dashboard description
old_desc = "Track your children's reading progress and achievements."
new_desc = "Track your children's reading, science, and Word Adventure progress."
content = content.replace(old_desc, new_desc)

# 2. Add Word Adventure stats section after the Quiz Scores section
# Find the "Vocabulary Words Learned" section and insert Word Adventure before it
old_vocab_section = '''    <div class="dashboard-section">
      <h3>Vocabulary Words Learned</h3>'''

# Build the Word Adventure section
word_adventure_section = '''    <div class="dashboard-section">
      <h3>\u2728 Word Adventure</h3>
      ${(function() {
        if (typeof initEnglishProgress !== 'function') return '<div class="empty-state"><p>Word Adventure not available.</p></div>';
        initEnglishProgress();
        var e = state.user.english;
        var totalStars = typeof getTotalStars === 'function' ? getTotalStars() : (e.totalStars || 0);
        if (e.totalChallengesCompleted === 0) return '<div class="empty-state"><p>No Word Adventure challenges completed yet.</p></div>';
        var rows = '';
        if (typeof ENGLISH_WORLDS !== 'undefined') {
          ENGLISH_WORLDS.forEach(function(w) {
            ['vocab', 'spelling', 'grammar'].forEach(function(type) {
              var key = w.id + '-' + type;
              var sc = e.challengeScores[key];
              if (sc) {
                var pct = Math.round((sc.score / sc.total) * 100);
                var typeLabel = type === 'vocab' ? 'Vocabulary' : type === 'spelling' ? 'Spelling' : 'Grammar';
                var color = pct >= 80 ? 'var(--color-success)' : pct >= 60 ? 'var(--color-accent)' : 'var(--color-error)';
                rows += '<div style="display:flex;align-items:center;gap:var(--space-3);padding:var(--space-3);background:var(--color-surface-2);border-radius:var(--radius-md)">';
                rows += '<span>' + w.icon + '</span>';
                rows += '<span style="flex:1;font-size:var(--text-sm);font-weight:600">' + w.name + ' - ' + typeLabel + '</span>';
                rows += '<span style="font-size:var(--text-sm);font-weight:700;color:' + color + '">' + sc.score + '/' + sc.total + ' (' + pct + '%)</span>';
                rows += '</div>';
              }
            });
          });
        }
        return '<div class="dashboard-stats" style="margin-bottom:var(--space-4)">' +
          '<div class="stat-card"><div class="stat-icon">\u2B50</div><div class="stat-value">' + totalStars + '</div><div class="stat-label">Stars Earned</div></div>' +
          '<div class="stat-card"><div class="stat-icon">\u2705</div><div class="stat-value">' + e.totalChallengesCompleted + '</div><div class="stat-label">Challenges Done</div></div>' +
          '<div class="stat-card"><div class="stat-icon">\U0001F31F</div><div class="stat-value">' + (e.perfectScores || 0) + '</div><div class="stat-label">Perfect Scores</div></div>' +
        '</div>' +
        (rows ? '<div style="display:flex;flex-direction:column;gap:var(--space-3)">' + rows + '</div>' : '');
      })()}
    </div>

    <div class="dashboard-section">
      <h3>Vocabulary Words Learned</h3>'''

content = content.replace(old_vocab_section, word_adventure_section)

with open('/home/user/workspace/story-quest/app.js', 'w', encoding='utf-8') as f:
    f.write(content)

print("Dashboard updated successfully")
