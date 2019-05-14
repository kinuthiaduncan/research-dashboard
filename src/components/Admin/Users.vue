<template>
    <vue-scroll class="page-dashboard">
        <el-row class="mt-0" :gutter="30">
            <button type="button" class="el-button animated fadeInRight el-button--default el-button--small is-plain" v-on:click="activateUserForm">
                <span><i class="mdi mdi-plus"></i> Add user</span>
            </button>
        </el-row>
        <el-row class="mt-0" :gutter="30" style="margin-top: 10px">
            <div class="page-vue-good-table scrollable only-y">
                <div class="vue-good-table-box card-base card-shadow--medium">
                    <table>
                        <thead>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>User Level</th>
                        </thead>
                        <tbody>
                            <tr v-for="user in users">
                                <td>{{user.first_name}}</td>
                                <td>{{user.last_name}}</td>
                                <td>{{user.email_address}}</td>
                                <td>{{user.user_level}}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </el-row>

        <el-dialog title="Enter user details" size = "tiny" :visible.sync="userCreateFormVisible">
            <el-form :rules="rules" ref="userForm" :model="userForm">
                <el-row>
                    <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                    <el-form-item label="First name" prop="first_name">
                        <el-input v-model="userForm.first_name" placeholder="First name" auto-complete="off"></el-input>
                    </el-form-item>
                    </el-col>
                    <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                        <el-form-item label="Last name" prop="last_name">
                            <el-input v-model="userForm.last_name" placeholder="Last name" auto-complete="off"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item label="Email" prop="email_address">
                    <el-input v-model="userForm.email_address" placeholder="Email" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="Password" prop="password">
                    <el-input type="password" v-model="userForm.password" placeholder="Password" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="User level" prop="user_level">
                    <el-select v-model="userForm.user_level" placeholder="Select user level">
                        <el-option
                                v-for="item in userLevels"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="storeUser('userForm')">Create</el-button>
                    <el-button @click="activateUserForm">Cancel</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>

    </vue-scroll>
</template>

<script>
    export default {
        name: "Users",
        data: function () {
            return {
                resized: false,
                all_users_url: "admin/users",
                users: [],
                userCreateFormVisible: false,
                userForm: {
                    first_name: '',
                    last_name: '',
                    email_address: '',
                    password: '',
                    user_level: ''
                },
                userLevels: [
                    {
                        value: 'admin',
                        label: 'Admin'
                    },
                    {
                        value: 'user',
                        label: 'User'
                    }
                ],
                rules: {
                    first_name: [
                        {required: true, message: 'Please input First name', trigger: 'blur'},
                    ],
                    last_name: [
                        {required: true, message: 'Please input Last name', trigger: 'blur'},
                    ],
                    email_address: [
                        {required: true, message: 'Please input Email', trigger: 'blur'},
                    ],
                    password: [
                        {required: true, message: 'Please input Password', trigger: 'blur'},
                    ],
                    user_level: [
                        {required: true, message: 'Please input User level', trigger: 'blur'},
                    ],
                },
                create_user_url: "admin/store_user"
            }
        },
        methods: {
            getAllUsers: function () {
                this.$http.get(this.all_users_url).then(response => {
                    this.users = response.data.users;
                }).catch(error => {
                    console.log(error);
                })
            },
            activateUserForm: function () {
                this.userCreateFormVisible = !this.userCreateFormVisible
            },
            storeUser: function (formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$http.post(this.create_user_url, this.userForm).then(response => {
                            this.$message({
                                message: response.data.message,
                                type: 'success'
                            });
                            this.userCreateFormVisible = false;
                            this.getAllUsers();
                        }).catch(error => {
                            this.$message.error('Sorry, an error occurred.');
                        })
                    } else {
                        return false;
                    }
                });
            }
        },
        mounted: function() {
            this.getAllUsers();
        }
    }
</script>

<style lang="scss">
    button{
        float: right;
    }
    .el-select{
        width: 100%;
    }
</style>