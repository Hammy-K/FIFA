let teamRating = 0;

// Dragging logic
const players = document.querySelectorAll('.player');
const positions = document.querySelectorAll('.position');
const team = {};

players.forEach(player => {
  player.addEventListener('dragstart', event => {
    event.dataTransfer.setData('text', JSON.stringify({
      name: player.dataset.name,
      rating: parseInt(player.dataset.rating, 10),
    }));
  });
});

positions.forEach(position => {
  position.addEventListener('dragover', event => {
    event.preventDefault(); // Allow dropping
  });

  position.addEventListener('drop', event => {
    event.preventDefault();

    // Get player data
    const playerData = JSON.parse(event.dataTransfer.getData('text'));

    // Check if position is already filled
    if (position.dataset.player) {
      alert('This position is already filled!');
      return;
    }

    // Assign player to position
    position.innerText = playerData.name;
    position.dataset.player = playerData.name;

    // Add player to the team object
    team[position.dataset.pos] = playerData.rating;

    // Update team rating
    updateTeamRating();
  });

  // Click to remove a player
  position.addEventListener('click', () => {
    if (position.dataset.player) {
      // Remove player from team object
      delete team[position.dataset.pos];

      // Reset position
      position.innerText = '';
      delete position.dataset.player;

      // Update team rating
      updateTeamRating();
    }
  });
});

function updateTeamRating() {
  const totalRating = Object.values(team).reduce((sum, rating) => sum + rating, 0);
  const playersCount = Object.keys(team).length;
  teamRating = playersCount > 0 ? Math.round(totalRating / playersCount) : 0;

  document.getElementById('team-rating').innerText = teamRating;
}
