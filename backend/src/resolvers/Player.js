function projections(parent, args, context) {
  return context.prisma.player({ id: parent.id }).projections();
}

module.exports = {
  projections,
};