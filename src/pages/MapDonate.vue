<template>
  <div class="container">
    <!-- Right side for Mastercard -->
    <div class="right-side">
      <h1>Donate with Mastercard</h1>
      <div class="form-group">
        <label for="cardNumber">Card Number:</label>
        <input type="text" id="cardNumber" v-model="cardNumber" required />
      </div>
      <div class="form-group">
        <label for="cardHolder">Card Holder:</label>
        <input type="text" id="cardHolder" v-model="cardHolder" required />
      </div>
      <div class="form-group">
        <label for="expirationDate">Expiration Date:</label>
        <input
          type="date"
          id="expirationDate"
          v-model="expirationDate"
          required
        />
      </div>
      <div class="form-group">
        <label for="cvv">CVV:</label>
        <input type="text" id="cvv" v-model="cvv" required />
      </div>
      <div class="form-group">
        <label for="amount">Amount:</label>
        <input
          type="text"
          id="amount"
          v-model="donateAmount"
          required
          :disabled="
            cardNumber == '' ||
            cardHolder == '' ||
            expirationDate == '' ||
            cvv == ''
          "
        />
      </div>
      <button
        @click="submitMastercard"
        class="submit-button"
        :disabled="
          cardNumber == '' ||
          cardHolder == '' ||
          expirationDate == '' ||
          cvv == '' ||
          donateAmount == ''
        "
      >
        Submit
      </button>
      <p
        v-if="showMastercardMessage"
        class="message"
        :style="{ color: mastercardMessageColor }"
      >
        {{ mastercardMessage }}
      </p>
    </div>

    <!-- QR Code -->
    <div class="qr-code">
      <h1>Scan QR Code to Donate</h1>
      <img :src="qrCodeUrl" alt="QR Code" />
      <p
        v-if="showQrMessage"
        class="message"
        :style="{ color: qrMessageColor }"
      >
        {{ qrMessage }}
      </p>
    </div>

    <!-- Left side for PayPal -->
    <div class="left-side">
      <h1>Donate with PayPal</h1>
      <p style="color: blue">paypal@greenmapper.com</p>
    </div>
  </div>
</template>

<script>
import { ref, watch } from "vue";
export default {
  emits: ["update:donateAmount"],
  setup(props, { emit }) {
    const donateAmount = ref(0);

    // Emitting the updated value of donateAmount whenever it changes
    watch(donateAmount, (newValue) => {
      emit("update:donateAmount", newValue);
    });

    return {
      donateAmount,
    };
  },
  data() {
    return {
      cardNumber: "",
      cardHolder: "",
      expirationDate: "",
      cvv: "",
      // amount: '',
      qrCodeUrl: "path/to/qr-code.png", // Replace 'path/to/qr-code.png' with the actual path to your QR code image
      showMastercardMessage: false,
      showQrMessage: false,
      showPayPalMessage: false,
      mastercardMessage: "",
      qrMessage: "",
      payPalMessage: "",
      mastercardMessageColor: "green",
      qrMessageColor: "green",
      payPalMessageColor: "green",
    };
  },
  methods: {
    submitMastercard() {
      if (
        this.cardNumber &&
        this.cardHolder &&
        this.expirationDate &&
        this.cvv
        // && this.amount
      ) {
        this.mastercardMessage = "Thanks!";
        this.showMastercardMessage = true;
      } else {
        this.mastercardMessage = "Try Again!";
        this.mastercardMessageColor = "red";
        this.showMastercardMessage = true;
      }
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.right-side,
.left-side {
  width: 45%;
}

.qr-code {
  width: 45%;
  text-align: center;
}

.submit-button {
  background-color: blue;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.message {
  font-size: 18px;
}
</style>
