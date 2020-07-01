<template>
  <div>
    <div>
      <h1 v-text="title">teste</h1>
      <form @submit.prevent="onSubmit">
        <input type="text" placeholder="Digite o cep" v-model="cep" />
        <button type="submit">Enviar</button>
      </form>
    </div>
    <div v-if="address.cidade !=''">
      <p>
        <b>Logradouro:</b>
        {{address.logradouro}}
      </p>
      <p>
        <b>Bairro:</b>
        {{address.bairro}}
      </p>
      <p>
        <b>Cidade:</b>
        {{address.localidade}}
      </p>
      <p>
        <b>Estado:</b>
        {{address.uf}}
      </p>
    </div>
    <div v-if="address.cep== true">CEP inexistente</div>
    <div v-if="address.logradouro ==true">CEP invalido</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      title: "Buscar Cep",
      cep: "",
      address: { cidade: "", cep: false, logradouro: false }
    };
  },
  methods: {
    onSubmit() {
      this.$http.get("https://viacep.com.br/ws/" + this.cep + "/json/").then(
        response => {
          this.address = response.body;
          if (response.body.erro) {
            this.address.cep = true;
            this.address.cidade = "";
            this.address.logradouro = false;
          }

          console.log(response);
        },
        error => {
          this.address.logradouro = true;
          this.address.cidade = "";
          this.address.cep = false;

          console.log("Erro");
        }
      );
    }
  }
};
</script>
<style scoped></style>>
