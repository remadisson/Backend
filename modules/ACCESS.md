# Description for ACCESS in remadisson backend.

## Groups and Permissions
» User (default/#0000):
- has Permisson to access own databases
- has Permission to create new databases (max. 5)
- has Permission to manage own databases (delete, clear, rename)

additionally:
- is allowed for fileupload
- is allowed for intern extras

<hr>

» Moderator (mod/#2000):
- has every Permission form User, just in a extended version (max. 20 databases)
- is allowed to access other Databases only with supportative purposes (needs access of User)
- allowed for (client sided) terminal access

additionally:
- is allowed for team chat
- allowed to set own profile picture
- is allowed to manage fileuploads and insufficient userprofiles

<hr>

» Admin (admin/#3000):
- has every Permission from User, just unlimited.
- is allowed to access every Database, and manage them like the owner
- allowed for direct terminal access

additionally:
- can deactivate api requests 
- can deactivate user login
- (can activate maintenance)
