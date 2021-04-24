<template>
    <div class="container mb-5">
        <div class="row">
            <div class="col-sm-6 mx-auto">
                <form action="" method="post" @submit.prevent="questionFaq" novalidate>
                    <div class="form-group">
                        <label for="name">Имя</label>
                        <input @blur="$v.formQuestion.name.$touch()"
                               :class="{'is-invalid' : $v.formQuestion.name.$error}"
                               v-model="formQuestion.name"
                                type="text" name="name" id="name" class="form-control">
                        <div class="invalid-feedback" v-if="!$v.formQuestion.name.required"> Поле обязательно для заполнения </div>
                        <div class="invalid-feedback" v-if="!$v.formQuestion.name.alpha"> Поле не может содержать цифры и другие символы</div>
                    </div>
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input @blur="$v.formQuestion.email.$touch()"
                               :class="{'is-invalid' : $v.formQuestion.email.$error}"
                               v-model="formQuestion.email"
                                type="text" name="email" id="email" class="form-control">
                        <div class="invalid-feedback" v-if="!$v.formQuestion.email.required"> Поле обязательно для заполнения </div>
                        <div class="invalid-feedback" v-if="!$v.formQuestion.email.email"> Поле должно быть email адресом</div>
                    </div>
                    <div class="form-group">
                        <label for="message">Вопрос</label>
                        <textarea @blur="$v.formQuestion.message.$touch()"
                                  :class="{'is-invalid' : $v.formQuestion.message.$error}"
                                v-model="formQuestion.message"
                                type="text" name="message" id="message" class="form-control" rows="5"></textarea>
                        <div class="invalid-feedback" v-if="!$v.formQuestion.message.required"> Поле обязательно для заполнения </div>
                    </div>
                    <div class="d-flex justify-content-center mx-auto">
                        <button type="submit" class="btn btn-outline-primary"
                                data-toggle="modal" data-target="#modal-que"
                                :disabled="disabledBut">Задать вопрос</button>
                    </div>
                </form>
                <div class="modal fade" id="modal-que" tabindex="-1" role="dialog" aria-labelledby="modal-que" aria-hidden="true" data-backdrop="static" data-keyboard="false">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-body">
                                <h2>Вопрос отправлен!</h2>
                            </div>
                            <div class="modal-footer">
                                <a href="faq.html">
                                    <button class="btn btn-outline-primary">ОК</button>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { required, email, helpers } from 'vuelidate/lib/validators'
    const alpha = helpers.regex('alpha', /^[a-zA-Zа-яёА-ЯЁ]*$/)

    export default {
        data(){
            return{
                formQuestion:{
                    name: '',
                    email: '',
                    message: ''
                }
            }
        },
        computed:{
            disabledBut(){
                return this.$v.formQuestion.name.$invalid ||
                    this.$v.formQuestion.email.$invalid ||
                    this.$v.formQuestion.message.$invalid
            }
        },
        methods:{
            questionFaq(){
                console.log(this.formQuestion)
            }
        },
        validations:{
            formQuestion:{
                name:{
                    required,
                    alpha
                },
                email:{
                    required,
                    email
                },
                message: {
                    required
                }
            }
        }
    }
</script>

<style>
    label{
        font-family: 'Lora', serif;
    }
</style>