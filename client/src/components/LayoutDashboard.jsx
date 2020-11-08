import React from 'react';
import { connect } from 'react-redux';
import { Avatar, Icon } from 'rsuite';
import { avatarText } from './../helpers/text-format.helper';
import { Link, navigate } from '@reach/router';
import { AbilityContext } from './../helpers/ability.helper';
import { logout } from './../store/slices/auth.slice';
import { useAbility } from '@casl/react';

export const LayoutDashboard = ({ user, children, logout }) => {
  const sideList = [
    { name: 'Home', path: '', icon: 'home', type: 'link', protect: false },
    {
      name: 'Loans',
      path: 'loans',
      icon: 'money',
      type: 'link',
      protect: true,
    },
    {
      name: 'Users',
      path: 'users',
      icon: 'user-circle',
      type: 'link',
      protect: true,
    },
  ];
  const ability = useAbility(AbilityContext);

  return (
    <div className='t-bg-gray-500 t-min-h-screen'>
      <div className='t-container t-mx-auto t-flex t-min-h-screen t-pt-2 '>
        <div className='t-w-1/4 t-p-2'>
          <div>
            <div className='t-shadow-md t-rounded t-p-2 t-bg-white'>
              {user ? (
                <div className='t-flex'>
                  <div className='t-pr-2'>
                    <Avatar className='t-bg-blue-500' circle>
                      {user.name && avatarText(user.name)}
                    </Avatar>
                  </div>
                  <div>
                    <div className='t-font-bold t-text-md'>{user.name}</div>
                    <div>{user.email}</div>
                  </div>
                </div>
              ) : (
                ''
              )}
            </div>

            <div className='t-mt-2 t-shadow-md t-rounded  t-overflow-hidden  t-bg-white'>
              <div className=' t-py-2 t-px-3 t-font-light t-text-lg t-bg-gray-400 '>
                <Icon icon='money' className='t-text-xl t-pr-2' />
                Loan Book
              </div>
              <div className='t-p-2'>
                {sideList.map((Item) => {
                  const { name, icon, protect, path } = Item;

                  return ability.can('list', name) || !protect ? (
                    <Link
                      to={path}
                      className='t-border-b hover:t-no-underline last:t-border-b-0'
                    >
                      <div className='t-py-2  hover:t-bg-blue-500 hover:t-text-white t-rounded t-px-2'>
                        <Icon icon={icon}></Icon> {name}
                      </div>
                    </Link>
                  ) : (
                    ''
                  );
                })}
                <button
                  onClick={() => {
                    navigate('/');
                    logout();
                  }}
                  className='t-w-full t-text-left t-border-0 t-p-2 hover:t-bg-blue-500 hover:t-text-white t-rounded'
                >
                  <Icon icon={'exit'}></Icon> Logout
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className='t-w-3/4 t-p-2'>
          <div className=' t-shadow-md t-rounded t-p-2 t-bg-white'>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

const mapDispatchToProps = { logout };

export default connect(mapStateToProps, mapDispatchToProps)(LayoutDashboard);
