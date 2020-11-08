export default {
  admin(user, { can, cannot }) {
    can('manage', 'all');
    cannot('edit', 'Loans');
  },
  agent(user, { can, cannot }) {
    can('list', 'Users', { role: 'customer' });
    can('show', 'Users', { role: 'customer' });
    can('create', 'Users', { role: 'customer' });
    can('edit', 'Users', { role: 'customer' });
    cannot('set-role', 'Users');
    can('delete', 'Users', { role: 'customer' });

    can('list', 'Loans');
    can('show', 'Loans');
    can('create', 'Loans');
    can('edit', 'Loans', { status: { $not: 'APPROVED' } });
    can('delete', 'Loans', {
      status: { $eq: 'NEW' },
      createdby: { $eq: user.id },
    });
  },
  customer(user, { can }) {
    can('list', 'Loans', { createdfor: user.id });
    can('show', 'Loans', { createdfor: user.id });
  },
};
