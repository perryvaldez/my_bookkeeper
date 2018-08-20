import util from '../lib/util';

const checkForAdmin = async (User, salt) => {
  try {
    const result = await User.findOne({ where: { username: 'admin' } }); 
    if (!result) {
      const count = await User.count();
      if (count > 0) {
        throw new Error('Missing admin user');
      } else {
        await User.create({ username: 'admin', password: util.hashPassword('password', salt), active: true });
      }
    }
  } catch (ex) {
    console.log('=== seedAdmin: Error: ', ex.message);
    process.exit(-1);
  }
};

module.exports = function(app) {
   checkForAdmin(app.models.User, app.settings.passSalt);
};
