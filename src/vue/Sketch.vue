<template>
    <div class="container">
        <div class="row">
            <div class="col-sm-5 mx-auto">
                <form @submit.prevent="registerSketch" v-bind:style="activeForm" novalidate method="post">
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
                                   type="text" class="form-control" id="size" placeholder="высота, ширина">
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
                <div id="box " v-bind:style="box">
                    <div class="box__endRec">
                        <h2>Запись прошла успешно!</h2>
                        <a href="recording.html">
                            <button class="box__but">ОК</button>
                        </a>
                    </div>
                </div>
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
                },
                box: {
                    display: "none",
                },
                activeForm : {
                    display: "block"
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

    .as{
        padding: 0;
        height: 100%;
    }
    .box__endRec{
        width: auto;
        height: 160px;
        border: none;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        box-shadow: 0 100px 80px rgba(0, 0, 0, 0.07), 0 41.7776px 33.4221px rgba(0, 0, 0, 0.0503198), 0 22.3363px 17.869px rgba(0, 0, 0, 0.0417275), 0 12.5216px 10.0172px rgba(0, 0, 0, 0.035), 0 6.6501px 5.32008px rgba(0, 0, 0, 0.0282725), 0 2.76726px 2.21381px rgba(0, 0, 0, 0.0196802);

    }
    .box__endRec h2{
        margin: 30px 0;
    }
    .box__but{
        width: 100px;
        height: 30px;
        border: none;
        background-color: rgba(0, 123, 255, 0.65);
        color: white;
        border-radius: 10px;
    }

</style>