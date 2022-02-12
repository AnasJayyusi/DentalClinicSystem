using DentalClinic.DAL;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(DentalClinicSystem.Startup))]
namespace DentalClinicSystem
{
    public partial class Startup
    {
        private DentalClinicDbContext _dbContext;
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);

            CreateRolesandUsers();
        }

        // In this method we will create default User roles and Admin user for login    
        private void CreateRolesandUsers()
        {
            _dbContext = new DentalClinicDbContext();

            // Creating first Admin Role and creating a default Admin User     
            if (!IsRoleExists("Admin"))
            {
                // Create Admin role
                CreateRole("Admin");
                // Add default User to Role Admin                  
                CreateUser("Administrator", "Anas_Jayyusi@outlook.com", "P@ssw0rd", "Admin");
            }

            // Creating Doctor role     
            if (!IsRoleExists("Doctor"))
            {
                CreateRole("Doctor");
            }

            //  Creating Reception role     
            if (!IsRoleExists("Reception"))
            {
                CreateRole("Reception");
            }
        }

        #region Helpers
        private bool IsRoleExists(string roleName)
        {
            using (var roleManager = new RoleManager<IdentityRole>(new RoleStore<IdentityRole>(_dbContext)))
            {
                return roleManager.RoleExists(roleName);
            }
        }
        public void CreateRole(string roleName)
        {
            using (var roleManager = new RoleManager<IdentityRole>(new RoleStore<IdentityRole>(_dbContext)))
            {
                var role = new Microsoft.AspNet.Identity.EntityFramework.IdentityRole();
                role.Name = roleName;
                roleManager.Create(role);
            }
        }
        public void CreateUser(string username, string email, string password, string roleName)
        {
            var userManager = new UserManager<ApplicationUser>(new UserStore<ApplicationUser>(_dbContext));

            var user = new ApplicationUser();
            user.UserName = username;
            user.Email = email;

            var chkUser = userManager.Create(user, password);

            if (chkUser.Succeeded)
            {
                var result1 = userManager.AddToRole(user.Id, roleName);

            }
        }
        #endregion
    }
}
