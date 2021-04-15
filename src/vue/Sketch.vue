<template>
    <div class="container">
        <div class="row">
            <div class="col-sm-5 mx-auto">
                <form @submit.prevent="registerSketch" novalidate method="post">
                    <div class="step" v-show="step === 1">
                        <div class="form-group">
                            <label for="name">Имя</label>
                            <input @blur="$v.formSk.name.$touch()"
                                   :class="{'is-invalid' : $v.formSk.name.$error}"
                                   v-model="formSk.name"
                                   type="text" class="form-control" id="name">
                            <div class="invalid-feedback" v-if="!$v.formSk.name.required"> Поле обязательно для заполнения </div>
                            <div class="invalid-feedback" v-if="!$v.formSk.name.alpha"> Поле не может содержать цифры и другие символы</div>
                        </div>
                        <div class="form-group">
                            <label for="surname">Фамилия</label>
                            <input @blur="$v.formSk.surname.$touch()"
                                   :class="{'is-invalid' : $v.formSk.surname.$error}"
                                   v-model="formSk.surname"
                                   type="text" class="form-control" id="surname">
                            <div class="invalid-feedback" v-if="!$v.formSk.surname.required"> Поле обязательно для заполнения </div>
                            <div class="invalid-feedback" v-if="!$v.formSk.surname.alpha"> Поле не может содержать цифры и другие символы</div>
                        </div>
                        <div class="form-group">
                            <label for="mail">Email</label>
                            <input @blur="$v.formSk.mail.$touch()"
                                   :class="{'is-invalid' : $v.formSk.mail.$error}"
                                   v-model="formSk.mail"
                                   type="text" class="form-control" id="mail">
                            <div class="invalid-feedback" v-if="!$v.formSk.mail.required"> Поле обязательно для заполнения </div>
                            <div class="invalid-feedback" v-if="!$v.formSk.mail.email"> Поле должно быть email адресом</div>
                        </div>
                        <div class="form-group">
                            <label for="phone">Телефон</label>
                            <div class="input-group mb-3">
                                <span class="input-group-text">+7</span>
                                <input @blur="$v.formSk.phone.$touch()"
                                       :class="{'is-invalid' : $v.formSk.phone.$error}"
                                       v-model="formSk.phone"
                                       type="text" class="form-control" id="phone" maxlength="10" placeholder="953...">
                                <div class="invalid-feedback" v-if="!$v.formSk.phone.required"> Поле обязательно для ввода </div>
                                <div class="invalid-feedback" v-if="!$v.formSk.phone.numeric"> Поле не может содержать буквы и другие символы</div>
                            </div>
                        </div>
                        <button class="btn btn-primary mt-3" type="button"
                                @click="nextStepToSketch"
                                :disabled="disabledBtn">Следующий шаг</button>
                    </div>

                    <div class="step" v-show="step === 2">
                        <div class="form-group">
                            <label for="size">Размер</label>
                            <input @blur="$v.formSk.size.$touch()"
                                   :class="{'is-invalid' : $v.formSk.size.$error}"
                                   v-model="formSk.size"
                                   type="text" class="form-control" id="size" placeholder="5x5">
                            <div class="invalid-feedback" v-if="!$v.formSk.size.required"> Поле обязательно для заполнения </div>
                        </div>
                        <div class="form-group">
                            <label for="place">Место нанесения</label>
                            <input @blur="$v.formSk.place.$touch()"
                                   :class="{'is-invalid' : $v.formSk.place.$error}"
                                   v-model="formSk.place"
                                   type="text" class="form-control" id="place">
                            <div class="invalid-feedback" v-if="!$v.formSk.place.required"> Поле обязательно для заполнения </div>
                            <div class="invalid-feedback" v-if="!$v.formSk.place.maxLength"> Поле не может содержать более 50 символов </div>
                            <div class="invalid-feedback" v-if="!$v.formSk.place.x"> Поле не может содержать цифры и другие символы</div>
                        </div>
                        <div class="form-group">
                            <label for="file">Пример</label>
                            <input type="file" class="form-control as" id="file" ref="file"
                                   v-on:change="handleFileUpload()">
                        </div>
                        <button @click="backStep" type="button" class="btn btn-light mt-3">Назад</button>
                        <button @click="endRec" v-on:click="submitFile()"
                                class="btn btn-primary mt-3" type="submit">Записаться</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    
</template>

<script>
    import { required, email, helpers, numeric, maxLength, between } from 'vuelidate/lib/validators'
    const alpha = helpers.regex('alpha', /^[a-zA-Zа-яёА-ЯЁ]*$/)
    const x = (/^[a-zA-Zа-яёА-ЯЁ\s]*$/)
    const axios = require('axios');


    export default {
        data(){
            return{
                step: 1,
                formSk: {
                    name: '',
                    surname: '',
                    mail: '',
                    phone: '',
                    place: '',
                    size: '',
                    file:'',
                }
            }
        },
        computed:{
            disabledBtn(){
                return this.$v.formSk.name.$invalid ||
                    this.$v.formSk.surname.$invalid ||
                    this.$v.formSk.mail.$invalid ||
                    this.$v.formSk.phone.$invalid
            }
        },
        methods: {
            nextStepToSketch(){
                if (!this.step < 2){
                    this.step++
                }
            },
            backStep(){
                if (this.step > 1){
                    this.step--
                }
            },
            registerSketch(){
                console.log('запись прошла успешно!')
                console.log(this.formSk)
            },
            endRec(){
                this.activeForm.display = "none"
                this.box.display="block"
            },
            submitFile(){
                let formData = new FormData();
                formData.append('file',this.file)
                axios.post( '',
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }
                ).then(function(){
                    console.log('да!!');
                })
                    .catch(function(){
                        console.log('нет!!');
                    });
            },
            handleFileUpload(){
                this.file = this.$refs.file.files[0];
            }

        },
        validations: {
            formSk: {
                name: {
                    required,
                    alpha
                },
                surname: {
                    required,
                    alpha
                },
                mail:{
                    required,
                    email
                },
                phone: {
                    required,
                    numeric
                },
                size: {
                    required
                },
                place: {
                    required,
                    maxLength: maxLength(50),
                    x
                }
            }
        }
    }
</script>

<style scoped>

</style>