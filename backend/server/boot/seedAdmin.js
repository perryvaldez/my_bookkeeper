import { getUserRoles } from '../lib/authUtils';

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

        role = await models.AppRole.findOne({ where: { name: 'admin' }});
        if (!role) {
          // Create the capabilities for the admin
          const capCreateUsers = await models.Capability.create({ name: 'createUsers' });
          const capRetrieveUsers = await models.Capability.create({ name: 'retrieveUsers' });
          const capUpdateUsers = await models.Capability.create({ name: 'updateUsers' });
          const capDeleteUsers = await models.Capability.create({ name: 'deleteUsers' });

          role = await models.AppRole.create({ name: 'admin' });

          await models.RoleCapability.create({ roleId: role.id, capabilityId: capCreateUsers.id });
          await models.RoleCapability.create({ roleId: role.id, capabilityId: capRetrieveUsers.id });
          await models.RoleCapability.create({ roleId: role.id, capabilityId: capUpdateUsers.id });
          await models.RoleCapability.create({ roleId: role.id, capabilityId: capDeleteUsers.id });

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
