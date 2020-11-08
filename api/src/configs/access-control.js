export default {
  admin(user, { can, cannot }) {
    can('manage', 'all');
    cannot('edit', 'Loans');
  },
  agent(user, { can }) {
    can('list', 'Users');
    can('show', 'Users');
    can('create', 'Users');
    can('edit', 'Users');
    can('delete', 'Users');

    can('list', 'Loans');
    can('show', 'Loans');
    can('create', 'Loans');
    can('edit', 'Loans', { status: { $not: 'approved' } });
  },
  customer(user, { can }) {
    can('list', 'Loans', { createdFor: user.id });
    can('show', 'Loans', { createdFor: user.id });
  },
};
