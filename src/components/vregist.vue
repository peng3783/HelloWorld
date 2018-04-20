<!-- :rules="rules" -->

<template>
	<el-form :model="ruleForm" status-icon  ref="ruleForm" label-width="100px" class="demo-ruleForm">
	   <el-form-item label="用户名" prop="username">
    	<el-input type="text"  v-model="ruleForm.username" auto-complete="off" placeholder="账号只能是6位以上中英文或者数字"></el-input>
 	  </el-form-item>
	  <el-form-item label="密码" prop="pass">
	    <el-input type="password" v-model="ruleForm.pass" auto-complete="off" placeholder="密码只能是6位以上中英文或者数字" ></el-input>
	  </el-form-item>
	  <el-form-item label="确认密码" prop="checkPass">
	    <el-input type="password" v-model="ruleForm.checkPass" auto-complete="off" placeholder="确认密码"></el-input>
	  </el-form-item>
  
	  <el-form-item>
	    <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
	    <el-button @click="resetForm('ruleForm')">重置</el-button>
	  </el-form-item>
	</el-form>
</template>
<script>
  import {mapActions} from "vuex";
  export default {
    data() {
       // 姓名验证
      let validatorName = function (rule, value, callback) {
            if (!value) {
              callback(new Error('请输入账号'))
            } else if (!/^[A-Za-z0-9_\-\u4e00-\u9fa5]+$/.test(value) || value.length < 6) {
              callback(new Error('账号只能是6位以上中英文或者数字'))
	        } else {
	          callback()
            }
      }
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        }else if (!/^[A-Za-z0-9]+$/.test(value) || value.length < 6) {
            callback(new Error('密码只能是6位以上英文或者数字'))
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          username : '',
          pass: '',
          checkPass: '',
        },
        rules: {
          username: [
            { validator: validatorName, trigger: 'blur' }
          ],	
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
        }
      };
    },
    methods: {
      
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
          	this.$store.dispatch("vregist",
          		{ password : this.ruleForm.pass, username : this.ruleForm.username});
            // console.log('submit!'+this.ruleForm.pass);
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>