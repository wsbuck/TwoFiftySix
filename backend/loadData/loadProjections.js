const { prisma } = require('../src/generated/prisma-client');
const csv = require('csv-parser');
const fs = require('fs');

async function main() {
  const data = [];
  const positions = ['QB', 'RB', 'TE', 'WR'];
  for await (const pos of positions) {
    const readStream = fs.createReadStream(`../data/${pos}_proj.csv`)
      .pipe(csv());
    for await (const chunk of readStream) {
      // console.log(chunk);
      data.push(chunk)
    }
  }

  console.log(data.length);

  await asyncForEach(data, async (proj) => {
    await waitFor(200);

    const pass_completions = parseFloat(proj.pass_comp) || 0;
    const pass_attempts = parseFloat(proj.pass_att) || 0;
    const pass_yards = parseFloat(proj.pass_yds) || 0;
    const pass_tds = parseFloat(proj.pass_tds) || 0;
    const pass_interceptions = parseFloat(proj.pass_int) || 0;
    const rush_attempts = parseFloat(proj.rush_att) || 0;
    const rush_yards = parseFloat(proj.rush_yds) || 0;
    const rush_tds = parseFloat(proj.rush_tds) || 0;
    const rec_targets = parseFloat(proj.rec_tgt) || 0;
    const rec_receptions = parseFloat(proj.rec) || 0;
    const rec_yards = parseFloat(proj.rec_yds) || 0;
    const rec_tds = parseFloat(proj.rec_tds) || 0;

    const newProjection = await prisma.createProjection({
      source: proj.data_src,
      pass_completions: pass_completions,
      pass_attempts: pass_attempts,
      pass_yards: pass_yards,
      pass_tds: pass_tds,
      pass_interceptions: pass_interceptions,
      rush_attempts: rush_attempts,
      rush_yards: rush_yards,
      rush_tds: rush_tds,
      rec_targets: rec_targets,
      rec_receptions: rec_receptions,
      rec_yards: rec_yards,
      rec_tds: rec_tds,
      player: {
        connect: { projection_id: proj.id }
      },
    });
    console.log(`Source: ${newProjection.source} Player: ${newProjection.player}`);
  });

  console.log('Done');
}

function waitFor(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function asyncForEach(array, callback) {
  for (let i = 0; i < array.length; i++) {
    await callback(array[i], i, array);
  }
}

main().catch(e => console.error(e));