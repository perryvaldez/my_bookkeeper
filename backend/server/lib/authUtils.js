export const getUserRoles = async (user, models) => {
  const roleList = await models.RoleMapping.find({ 
    where: { 
      principalType: models.RoleMapping.USER,
      principalId: user.id,
    }, 
    fields: {
        principalId: false,
        principalType: false,
        id: false,
        roleId: true,
    },
  });

  let ret = [];

  if (roleList && roleList.length > 0) {
    const promises = roleList.map((role) => models.AppRole.findOne({ where: { id: role.roleId } }));
    ret = await Promise.all(promises);
  }

  return ret;
};  