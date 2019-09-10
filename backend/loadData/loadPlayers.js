const { prisma } = require('../src/generated/prisma-client');
const csv = require('csv-parser');
const fs = require('fs');

async function main() {
  const data = [];
  const readStream = fs.createReadStream('../data/players_new.csv')
    .pipe(csv());
  for await (const chunk of readStream) {
    // console.log(chunk);
    data.push(chunk)
  }

  await asyncForEach(data, async (player) => {
    await waitFor(500);
    const newPlayer = await prisma.createPlayer({
      name: player.first_name + ' ' + player.last_name,
      projection_id: player.id,
      position: player.position,
    })
    console.log(newPlayer.name);
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