const { prisma } = require('../src/generated/prisma-client');
const csv = require('csv-parser');
const fs = require('fs');

async function main() {
  let data = [];
  const dataErrors = [];
  const readStream = fs.createReadStream(`../data/stats.csv`)
  .pipe(csv());
  for await (const chunk of readStream) {
    data.push(chunk);
  }

  console.log(data.length);
  // data.splice(0, 18066);
  // console.log(data.length);

  let i = 1;
  await asyncForEach(data, async (stat) => {
    console.log(i++);
    await waitFor(200);
    await createGameStat(stat);
  });
  console.log('Done');
}

async function createGameStat(stat) {
  try {
    const player = await prisma.player({
      projection_id: String(stat.player_id)
    });
    console.log(`proj_id: ${stat.player_id}`);
    if (player) {
      const newStat = await prisma.createGameStat({
        player: {
          connect: { projection_id: stat.player_id }
        },
        season: stat.season,
        week: String(stat.week),
        pass_attempts: parseInt(stat.pass_attempts) || 0,
        pass_completions: parseInt(stat.pass_completions) || 0,
        pass_yards: parseInt(stat.pass_yards) || 0,
        pass_tds: parseInt(stat.pass_tds) || 0,
        pass_interceptions: parseInt(stat.pass_interceptions) || 0,
        sacks: parseInt(stat.sacks) || 0,
        rush_attempts: parseInt(stat.rush_attempts) || 0,
        rush_yards: parseInt(stat.rush_yards) || 0,
        rush_tds: parseInt(stat.rush_tds) || 0,
        rec_targets: parseInt(stat.rec_targets) || 0,
        rec_receptions: parseInt(stat.rec_receptions) || 0,
        rec_yards: parseInt(stat.rec_yards) || 0,
        rec_tds: parseInt(stat.rec_tds) || 0,
        games_played: parseInt(stat.games_played) || 0,
      });
      console.log(`stat created: ${newStat.id}`);
    }
  } catch(error) {
    console.log(error);
    await createGameStat(stat);
  }
}

async function asyncForEach(array, callback) {
  for (let i = 0; i < array.length; i++) {
    await callback(array[i], i, array);
  }
}

function waitFor(ms) {
  return new Promise(r => setTimeout(r, ms));
}

main().catch(e => console.error(e));