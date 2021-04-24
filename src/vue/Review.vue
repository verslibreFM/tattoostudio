<template>
    <div class="container">
        <div class="row">
            <div class="col-sm-6 mx-auto">
                <form action="" method="post" @submit.prevent="giveReview" novalidate>
                    <div class="form-group">
                        <label for="name">Имя</label>
                        <input @blur="$v.formReview.name.$touch()"
                               :class="{'is-invalid' : $v.formReview.name.$error}"
                               v-model="formReview.name"
                               type="text" name="name" id="name" class="form-control">
                        <div class="invalid-feedback" v-if="!$v.formReview.name.required"> Поле обязательно для заполнения </div>
                        <div class="invalid-feedback" v-if="!$v.formReview.name.alpha"> Поле не может содержать цифры и другие символы</div>
                    </div>
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input @blur="$v.formReview.email.$touch()"
                               :class="{'is-invalid' : $v.formReview.email.$error}"
                               v-model="formReview.email"
                               type="text" name="email" id="email" class="form-control">
                        <div class="invalid-feedback" v-if="!$v.formReview.email.required"> Поле обязательно для заполнения </div>
                        <div class="invalid-feedback" v-if="!$v.formReview.email.email"> Поле должно быть email адресом</div>
                    </div>
                    <div class="form-group">
                        <label for="message">Вопрос</label>
                        <textarea @blur="$v.formReview.message.$touch()"
                                  :class="{'is-invalid' : $v.formReview.message.$error}"
                                  v-model="formReview.message"
                                  type="text" name="message" id="message" class="form-control" rows="5"></textarea>
                        <div class="invalid-feedback" v-if="!$v.formReview.message.required"> Поле обязательно для заполнения </div>
                    </div>
                    <div class="d-flex justify-content-center mx-auto">
                        <button type="submit" class="btn btn-outline-primary"
                                data-toggle="modal" data-target="#modal-rew"
                                :disabled="disabledBut">Отправить</button>
                    </div>
                </form>
                <div class="modal fade" id="modal-rew" tabindex="-1" role="dialog" aria-labelledby="modal-rew" aria-hidden="true" data-backdrop="static" data-keyboard="false">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-body">
                                <h2>Отзыв отправлен!</h2>
                            </div>
                            <div class="modal-footer">
                                <a href="osipova.html">
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
                formReview:{
                    name: '',
                    email: '',
                    message: ''
                }
            }
        },
        computed:{
            disabledBut(){
                return this.$v.formReview.name.$invalid ||
                    this.$v.formReview.email.$invalid ||
                    this.$v.formReview.message.$invalid
            }
        },
        methods:{
            giveReview(){
                console.log(this.formReview)
            }
        },
        validations:{
            formReview:{
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

<style scoped>

</style>