const { getUserId } = require('../utils');

async function userFeed(parent, args, context) {
  const userId = getUserId(context);
  if (!userId) {
    throw new Error('No such user found');
  }

  const where = args.filter
    ? {
        OR: [
          { name_contains: args.filter },
        ],
      }
    : {}

  const users = await context.prisma.users({
    where,
    skip: args.skip,
    first: args.first,
  });

  const count = await context.prisma
    .usersConnection({
      where,
      skip: args.skip,
    })
    .aggregate()
    .count();

  return {
    users,
    count,
  };
}


async function playerFeed(parent, args, context) {
  const userId = getUserId(context);
  if (!userId) {
    throw new Error('No such user found');
  }

  const where = args.filter || args.position
    ? {
        AND: [
          { name_contains: args.filter },
          { position_in: args.position },
          // { position_contains: args.filter },
        ],
      }
    : {}

  const players = await context.prisma.players({
    where,
    skip: args.skip,
    first: args.first,
    orderBy: args.orderBy,
  });

  const count = await context.prisma
    .playersConnection({
      where,
      skip: args.skip,
      first: args.first,
    })
    .aggregate()
    .count();

  const totalCount = await context.prisma.playersConnection({
    where,
  })
  .aggregate()
  .count();
  
  const hasNextPage = (totalCount - (count + args.skip)) > 0;

  return {
    players,
    count,
    hasNextPage,
  };
}


async function playerDetail(parent, args, context, info) {
  const id = args.id;
  const player = await context.prisma.player({ id });
  return player
}

module.exports = {
  userFeed,
  playerFeed,
  playerDetail,
}