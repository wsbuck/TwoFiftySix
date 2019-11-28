const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { APP_SECRET, getUserId } = require('../utils');

async function signup(parent, args, context, info) {
  const password = await bcrypt.hash(args.password, 10);
  const user = await context.prisma.createUser({
     ...args,
     password,
  });
  const scoreSetting = await context.prisma.createScoreSetting({
    user: {
      connect: { id: user.id }
    },
  });

  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  return {
    token,
    user,
  };
}

async function login(parent, args, context, info) {
  const user = await context.prisma.user({ email: args.email });
  if (!user) {
    throw new Error('No such user found');
  }

  const valid = await bcrypt.compare(args.password, user.password);
  if (!valid) {
    throw new Error('Invalid password');
  }

  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  return {
    token,
    user,
  };
}

async function updateScoreSetting(parent, args, context, info) {
  const userId = getUserId(context);
  if (!userId) {
    throw new Error("No such user found");
  }

  const scoreSettingId = await context.prisma
    .user({ id: userId })
    .score_setting().id();

  const scoreSetting = await context.prisma.updateScoreSetting({
    data: {
      num_qb: args.num_qb,
      num_rb: args.num_rb,
      num_wr: args.num_wr,
      num_te: args.num_te,
      num_wrt: args.num_wrt,
      num_qwrt: args.num_qwrt,
    },
    where: {
      id: scoreSettingId,
    }
  });

  return scoreSetting;
}

module.exports = {
  signup,
  login,
  updateScoreSetting,
};