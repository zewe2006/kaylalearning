#!/usr/bin/env python3
"""Add Math Galaxy integration to app.js"""

with open('/home/user/workspace/story-quest/app.js', 'r') as f:
    content = f.read()

# 1. Add math to default kid data model (after english block)
old_data = """    english: {
      challengeScores: {},
      totalChallengesCompleted: 0,
      vocabCompleted: 0,
      spellingCompleted: 0,
      grammarCompleted: 0,
      perfectScores: 0,
      totalStars: 0
    }
  };
}"""

new_data = """    english: {
      challengeScores: {},
      totalChallengesCompleted: 0,
      vocabCompleted: 0,
      spellingCompleted: 0,
      grammarCompleted: 0,
      perfectScores: 0,
      totalStars: 0
    },
    // Math Galaxy
    math: {
      lessonsCompleted: 0,
      gamesCompleted: 0,
      perfectGames: 0,
      totalStars: 0,
      gameScores: {},
      completedIds: {}
    }
  };
}"""
content = content.replace(old_data, new_data, 1)

# 2. Add math data initialization in the kids loading
old_init = "    if (!kid.english) kid.english = { challengeScores: {}, totalChallengesCompleted: 0, vocabCompleted: 0, spellingCompleted: 0, grammarCompleted: 0, perfectScores: 0, totalStars: 0 };"
new_init = old_init + "\n    if (!kid.math) kid.math = { lessonsCompleted: 0, gamesCompleted: 0, perfectGames: 0, totalStars: 0, gameScores: {}, completedIds: {} };"
content = content.replace(old_init, new_init, 1)

# 3. Add nav item for Math Galaxy (after Word Adventure)
old_nav = """      <button class="nav-item ${state.currentView.startsWith("english") ? "active" : ""}" onclick="navigate('english')">
        <i data-lucide="book-open"></i> Word Adventure
      </button>"""
new_nav = old_nav + """
      <button class="nav-item ${state.currentView.startsWith("math") ? "active" : ""}" onclick="navigate('math')">
        <i data-lucide="calculator"></i> Math Galaxy
      </button>"""
content = content.replace(old_nav, new_nav, 1)

# 4. Add routing cases for math views (before default case)
old_routing = """    default:
      renderLibrary(main);"""
new_routing = """    // Math Galaxy views
    case "math":
      initMathProgress();
      renderMathHome(main);
      break;
    case "math-lesson":
      initMathProgress();
      renderMathLesson(main);
      break;
    case "math-game":
      initMathProgress();
      renderMathGame(main);
      break;
    default:
      renderLibrary(main);"""
content = content.replace(old_routing, new_routing, 1)

# 5. Add MATH_BADGES to badges page
old_badges = '${[...BADGES, ...(typeof SCIENCE_BADGES !== "undefined" ? SCIENCE_BADGES : []), ...(typeof ENGLISH_BADGES !== "undefined" ? ENGLISH_BADGES : [])].map(badge => {'
new_badges = '${[...BADGES, ...(typeof SCIENCE_BADGES !== "undefined" ? SCIENCE_BADGES : []), ...(typeof ENGLISH_BADGES !== "undefined" ? ENGLISH_BADGES : []), ...(typeof MATH_BADGES !== "undefined" ? MATH_BADGES : [])].map(badge => {'
content = content.replace(old_badges, new_badges, 1)

# 6. Update badges page description
old_badges_desc = 'Earn badges by reading stories, exploring science, conquering Word Adventure, and acing quizzes!'
new_badges_desc = 'Earn badges by reading stories, exploring science, conquering Word Adventure, mastering Math Galaxy, and acing quizzes!'
content = content.replace(old_badges_desc, new_badges_desc, 1)

# 7. Update parent dashboard subtitle
old_dash_sub = "Track your children's reading, science, and Word Adventure progress."
new_dash_sub = "Track your children's reading, science, Word Adventure, and Math Galaxy progress."
content = content.replace(old_dash_sub, new_dash_sub, 1)

# 8. Add Math Galaxy section to parent dashboard (after Word Adventure section)
wa_section_end = '      })()}\n    </div>\n\n    <div class="dashboard-section">\n      <h3>Vocabulary Words Learned</h3>'

# Build the math section string using concatenation to avoid f-string issues with JS
math_lines = []
math_lines.append('      })()}')
math_lines.append('    </div>')
math_lines.append('')
math_lines.append('    <div class="dashboard-section">')
math_lines.append('      <h3>\U0001F680 Math Galaxy</h3>')
math_lines.append("      ${(function() {")
math_lines.append("        if (typeof initMathProgress !== 'function') return '<div class=\"empty-state\"><p>Math Galaxy not available.</p></div>';")
math_lines.append("        initMathProgress();")
math_lines.append("        var m = state.user.math;")
math_lines.append("        if ((m.lessonsCompleted || 0) === 0 && (m.gamesCompleted || 0) === 0) return '<div class=\"empty-state\"><p>No Math Galaxy activity yet.</p></div>';")
math_lines.append("        var rows = '';")
math_lines.append("        if (typeof MATH_GAMES !== 'undefined') {")
math_lines.append("          ['beginner','intermediate','advanced'].forEach(function(tier) {")
math_lines.append("            var tierLabel = tier === 'beginner' ? 'Beginner' : tier === 'intermediate' ? 'Intermediate' : 'Advanced';")
math_lines.append("            if (MATH_GAMES[tier]) {")
math_lines.append("              MATH_GAMES[tier].forEach(function(g) {")
math_lines.append("                var sc = m.gameScores[g.id];")
math_lines.append("                if (sc) {")
math_lines.append("                  var pct = Math.round((sc.score / sc.total) * 100);")
math_lines.append("                  var color = pct >= 80 ? 'var(--color-success)' : pct >= 60 ? 'var(--color-accent)' : 'var(--color-error)';")
math_lines.append("                  rows += '<div style=\"display:flex;align-items:center;gap:var(--space-3);padding:var(--space-3);background:var(--color-surface-2);border-radius:var(--radius-md)\">';")
math_lines.append("                  rows += '<span>' + g.icon + '</span>';")
math_lines.append("                  rows += '<span style=\"flex:1;font-size:var(--text-sm);font-weight:600\">' + g.title + ' (' + tierLabel + ')</span>';")
math_lines.append("                  rows += '<span style=\"font-size:var(--text-sm);font-weight:700;color:' + color + '\">' + sc.score + '/' + sc.total + ' (' + pct + '%)</span>';")
math_lines.append("                  rows += '</div>';")
math_lines.append("                }")
math_lines.append("              });")
math_lines.append("            }")
math_lines.append("          });")
math_lines.append("        }")
math_lines.append("        return '<div class=\"dashboard-stats\" style=\"margin-bottom:var(--space-4)\">' +")
math_lines.append("          '<div class=\"stat-card\"><div class=\"stat-icon\">\U0001F4DA</div><div class=\"stat-value\">' + (m.lessonsCompleted || 0) + '</div><div class=\"stat-label\">Lessons Done</div></div>' +")
math_lines.append("          '<div class=\"stat-card\"><div class=\"stat-icon\">\U0001F3AE</div><div class=\"stat-value\">' + (m.gamesCompleted || 0) + '</div><div class=\"stat-label\">Games Done</div></div>' +")
math_lines.append("          '<div class=\"stat-card\"><div class=\"stat-icon\">\u2B50</div><div class=\"stat-value\">' + (m.totalStars || 0) + '</div><div class=\"stat-label\">Stars Earned</div></div>' +")
math_lines.append("          '<div class=\"stat-card\"><div class=\"stat-icon\">\U0001F31F</div><div class=\"stat-value\">' + (m.perfectGames || 0) + '</div><div class=\"stat-label\">Perfect Games</div></div>' +")
math_lines.append("        '</div>' +")
math_lines.append("        (rows ? '<div style=\"display:flex;flex-direction:column;gap:var(--space-3)\">' + rows + '</div>' : '');")
math_lines.append("      })()}")
math_lines.append('    </div>')
math_lines.append('')
math_lines.append('    <div class="dashboard-section">')
math_lines.append('      <h3>Vocabulary Words Learned</h3>')

math_section = '\n'.join(math_lines)
content = content.replace(wa_section_end, math_section, 1)

# 9. Also check math badges in the badge check function
old_badge_check = '  if (typeof checkScienceBadges === "function") checkScienceBadges();'
new_badge_check = old_badge_check + '\n  if (typeof checkMathBadges === "function") checkMathBadges();'
content = content.replace(old_badge_check, new_badge_check, 1)

with open('/home/user/workspace/story-quest/app.js', 'w') as f:
    f.write(content)

print("Done! All Math Galaxy changes applied to app.js")
