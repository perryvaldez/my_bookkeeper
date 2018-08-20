const checkForAdmin = async (models, salt) => {
  let adminUser;

  try {
    adminUser = await models.AppUser.findOne({ where: { username: 'admin' } }); 
    if (!adminUser) {
      const count = await models.AppUser.count();
      if (count > 0) {
        throw new Error('Missing admin user');
      } else {
        // Check if the 'admin' role already exists; if it isn't, then create the role
        let role;

        role = await models.Role.findOne({ where: { name: 'admin' }});
        if (!role) {
          role = await models.Role.create({ name: 'admin' });
        }

        adminUser = await models.AppUser.create({ username: 'admin', password: 'password', email: "admin@example.com", active: true });
        await role.principals.create({
          principalType: models.RoleMapping.USER,
          principalId: adminUser.id,
        });
      }
    }
  } catch (ex) {
    process.exit(-1);
  }
};

module.exports = function(app) {
   checkForAdmin(app.models, app.settings.passSalt);
};
