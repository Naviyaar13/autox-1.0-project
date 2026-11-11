package main

default allow = false


# Read All
allow_view {
    input.rolePermissions[input.permission_for]["view"] == true
}

allow_create {
    input.rolePermissions[input.permission_for]["create"] == true
}

#Edit Own
allow_edit {
    input.rolePermissions[input.permission_for]["edit"] == "own"
    some i
    input.permissions[i].userId == input.user_id
    input.permissions[i].resourceId == input.resource_id
    input.permissions[i].owner == true
    input.permissions[i].permissions.write == true
}

#Edit All
allow_edit {
    input.rolePermissions[input.permission_for]["edit"] == true
}


#Edit Own
allow_delete {
    input.rolePermissions[input.permission_for]["delete"] == "own"
    some i
    input.permissions[i].userId == input.user_id
    input.permissions[i].resourceId == input.resource_id
    input.permissions[i].owner == true
    input.permissions[i].permissions.delete == true
}

#Edit All
allow_delete {
    input.rolePermissions[input.permission_for]["delete"] == true
}

allow_read_resources[resource_id] {
    input.rolePermissions[input.permission_for]["view"] == true
    some i
    input.permissions[i].userId == input.user_id
    input.permissions[i].permissions.view == true
    some j
    input.permissions[i].resourceId == input.resources[j]._id
    resource_id = input.resources[j]
}

allow_read_own[resource_id] {
    input.rolePermissions[input.permission_for]["view"] == true
    some j
    resource_id = input.resources[j]
}