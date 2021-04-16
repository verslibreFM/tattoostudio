<template>
<div class="container mt-5">
    <div class="row">
        <div class="col-sm-5 mx-auto">
            <form @submit.prevent="registerUser" novalidate v-bind:style="activeForm" method="post">
                <div class="step" v-show="step === 1">
                    <div class="form-group">
                        <label for="name">Имя</label>
                        <input @blur="$v.formReg.name.$touch()"
                               :class="{'is-invalid' : $v.formReg.name.$error}"
                               v-model="formReg.name"
                               type="text" class="form-control" id="name">
                        <div class="invalid-feedback" v-if="!$v.formReg.name.required"> Поле обязательно для заполнения </div>
                        <div class="invalid-feedback" v-if="!$v.formReg.name.alpha"> Поле не может содержать цифры и другие символы</div>
                    </div>
                    <div class="form-group">
                        <label for="surname">Фамилия</label>
                        <input @blur="$v.formReg.surname.$touch()"
                               :class="{'is-invalid' : $v.formReg.surname.$error}"
                               v-model="formReg.surname"
                               type="text" class="form-control" id="surname">
                        <div class="invalid-feedback" v-if="!$v.formReg.surname.required"> Поле обязательно для заполнения </div>
                        <div class="invalid-feedback" v-if="!$v.formReg.surname.alpha"> Поле не может содержать цифры и другие символы</div>
                    </div>
                    <div class="form-group">
                        <label for="mail">Email</label>
                        <input @blur="$v.formReg.mail.$touch()"
                               :class="{'is-invalid' : $v.formReg.mail.$error}"
                               v-model="formReg.mail"
                               type="text" class="form-control" id="mail">
                        <div class="invalid-feedback" v-if="!$v.formReg.mail.required"> Поле обязательно для заполнения </div>
                        <div class="invalid-feedback" v-if="!$v.formReg.mail.email"> Поле должно быть email адресом</div>
                    </div>
                    <div class="form-group">
                        <label for="phone">Телефон</label>
                        <div class="input-group mb-3">
                            <span class="input-group-text">+7</span>
                            <input @blur="$v.formReg.phone.$touch()"
                                   :class="{'is-invalid' : $v.formReg.phone.$error}"
                                   v-model="formReg.phone"
                                   type="text" class="form-control" id="phone" maxlength="10" placeholder="953...">
                            <div class="invalid-feedback" v-if="!$v.formReg.phone.required"> Поле обязательно для ввода </div>
                            <div class="invalid-feedback" v-if="!$v.formReg.phone.numeric"> Поле не может содержать буквы и другие символы</div>
                        </div>

                    </div>
                    <button class="btn btn-primary mt-3" type="button"
                            @click="nextStep"
                            :disabled="disabledBtn1">Следующий шаг</button>
                </div>
                <transition name="slide-fade">
                    <div class="step" v-show="step === 2">
                        <div class="form-group">
                            <label for="size">Размер</label>
                            <input @blur="$v.formReg.size.$touch()"
                                   :class="{'is-invalid' : $v.formReg.size.$error}"
                                   v-model="formReg.size"
                                   type="text" class="form-control" id="size" placeholder="высота, ширина">
                            <div class="invalid-feedback" v-if="!$v.formReg.size.required"> Поле обязательно для заполнения </div>
                        </div>
                        <div class="form-group">
                            <label for="place">Место нанесения</label>
                            <input @blur="$v.formReg.place.$touch()"
                                   :class="{'is-invalid' : $v.formReg.place.$error}"
                                   v-model="formReg.place"
                                   type="text" class="form-control" id="place">
                            <div class="invalid-feedback" v-if="!$v.formReg.place.required"> Поле обязательно для заполнения </div>
                            <div class="invalid-feedback" v-if="!$v.formReg.place.maxLength"> Поле не может содержать более 50 символов </div>
                            <div class="invalid-feedback" v-if="!$v.formReg.place.x"> Поле не может содержать цифры и другие символы</div>
                        </div>
                        <div class="form-group">
                            <label for="file">Эскиз</label>
                            <input type="file" class="form-control as" id="file" ref="file"
                                   v-on:change="handleFileUpload()">
                        </div>
                        <button @click="backStep" type="button" class="btn btn-light mt-3">Назад</button>
                        <button class="btn btn-primary mt-3" type="button"
                                @click="nextStep"
                                :disabled="disabledBtn2">Следующий шаг</button>
                    </div>
                </transition>

                <transition name="slide-fade">
                    <div class="step" v-show="step === 3">
                        <div class="form-group">
                            <label for="day">День</label>
                            <input @blur="$v.formReg.day.$touch()"
                                   :class="{'is-invalid' : $v.formReg.day.$error}"
                                   v-model="formReg.day"
                                   type="text" class="form-control" id="day">
                            <div class="invalid-feedback" v-if="!$v.formReg.day.required">Поле обязательно для заполнения</div>
                            <div class="invalid-feedback" v-if="!$v.formReg.day.between">Давайте действовать рамках месяца планеты Земля</div>
                        </div>
                        <div class="form-group">
                            <label for="month">Месяц</label>
                            <select @blur="$v.formReg.month.$touch()"
                                   :class="{'is-invalid' : $v.formReg.month.$error}"
                                   v-model="formReg.month" class="form-control" id="month">
                                <option disabled value="">Выберите один из вариантов</option>
                                <option>Январь</option>
                                <option>Февраль</option>
                                <option>Март</option>
                                <option>Апрель</option>
                                <option>Май</option>
                                <option>Июнь</option>
                                <option>Июль</option>
                                <option>Август</option>
                                <option>Сентябрь</option>
                                <option>Октябрь</option>
                                <option>Ноябрь</option>
                                <option>Декабрь</option>
                            </select>
                            <div class="invalid-feedback" v-if="!$v.formReg.month.required">Поле обязательно для заполнения</div>
                        </div>
                        <div class="form-group">
                            <label for="times">Время</label>
                            <select @blur="$v.formReg.times.$touch()"
                                   :class="{'is-invalid' : $v.formReg.times.$error}"
                                   v-model="formReg.times" class="form-control" id="times">
                                <option disabled value="">Выберите один из вариантов</option>
                                <option>10:00</option>
                                <option>11:00</option>
                                <option>12:00</option>
                                <option>13:00</option>
                                <option>14:00</option>
                                <option>15:00</option>
                                <option>16:00</option>
                                <option>17:00</option>
                                <option>18:00</option>
                                <option>19:00</option>
                            </select>
                            <div class="invalid-feedback" v-if="!$v.formReg.times.required">Поле обязательно для заполнения</div>
                        </div>
                        <button @click="backStep" type="button" class="btn btn-light mt-3">Назад</button>
                        <button @click="record" v-on:click="submitFile()"
                                class="btn btn-primary mt-3" type="submit">Записаться</button>
                    </div>
                </transition>
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
            formReg: {
                name: '',
                surname: '',
                mail: '',
                phone: '',
                place: '',
                size: '',
                file:'',
                day: '',
                month: '',
                times: '',
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
        disabledBtn1(){
            return this.$v.formReg.name.$invalid ||
                this.$v.formReg.surname.$invalid ||
                this.$v.formReg.mail.$invalid ||
                this.$v.formReg.phone.$invalid
        },
        disabledBtn2(){
            return this.$v.formReg.size.$invalid ||
                this.$v.formReg.place.$invalid
        },
    },
    methods: {
        nextStep(){
            if (!this.step < 4){
                this.step++
            }
        },
        backStep(){
            if (this.step > 1){
                this.step--
            }
        },
        registerUser(){
            console.log('запись прошла успешно!')
            console.log(this.formReg)
        },
        record(){
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
        formReg: {
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
            },
            day: {
                required,
                between: between(1,31),
                numeric
            },
            month: {
                required
            },
            times: {
                required
            }

        }
    }
}
</script>

<style scoped>
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

.as{
    padding: 0;
    height: 100%;
}
.slide-fade-enter-active {
    transition: all .3s ease;
}
.slide-fade-enter{
    transform: translateX(10px);
    opacity: 0;
}

</style>