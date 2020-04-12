<template>
	<div>
		<v-container>
			<v-row
				no-gutters
				:align="alignment"
				:justify="justify"
				class="grey lighten-5"
				style="height: 700px;"
			>
				<v-col cols="12">
					<v-stepper class="elevation-0" v-model="e1">
						<v-stepper-header>
							<v-stepper-step :complete="e1 > 1" step="1" color="accent">
								<span class="accent--text">General Info</span>
							</v-stepper-step>

							<v-divider></v-divider>

							<v-stepper-step :complete="e1 > 2" step="2" color="accent">
								<span class="accent--text">Personal Info</span>
							</v-stepper-step>

							<v-divider></v-divider>

							<v-stepper-step step="3" :complete="finished" color="accent">
								<span class="accent--text">Work Info</span>
							</v-stepper-step>
						</v-stepper-header>
						<v-divider></v-divider>
						<v-stepper-items>
							<!-- General Info -->
							<v-stepper-content step="1">
								<v-card class="mb-12" height="400px">
									<v-row :align="alignment" :justify="justify">
										<!-- Title -->
										<v-col cols="12" sm="6" md="2">
											<v-select :items="items" filled label="Title"></v-select>
										</v-col>
										<!-- First Name -->
										<v-col cols="12" sm="6" md="2">
											<v-text-field
												label="First Name"
												v-model="firstname"
												:rules="nameRules"
												:counter="10"
												placeholder="name"
												filled
												color="primary"
											></v-text-field>
										</v-col>
										<!-- Second Name -->
										<v-col cols="12" sm="6" md="2">
											<v-text-field
												label="Second Name"
												placeholder="name"
												:rules="nameRules"
												:counter="10"
												filled
												color="primary"
												v-model="secondname"
											></v-text-field>
										</v-col>
										<!-- Last name -->
										<v-col cols="12" sm="6" md="2">
											<v-text-field
												label="Last Name"
												placeholder="name"
												:rules="nameRules"
												:counter="10"
												filled
												color="primary"
												v-model="lastname"
											></v-text-field>
										</v-col>
									</v-row>
									<v-row :align="alignment" :justify="justify">
										<!-- Phone Number -->
										<v-col cols="12" sm="6" md="4">
											<v-text-field
												label="Phone"
												prefix="+254"
												:rules="phoneRules"
												placeholder="7.."
												v-model="phone"
												filled
												color="primary"
											></v-text-field>
										</v-col>
										<!-- Email -->
										<v-col cols="12" sm="6" md="4">
											<v-text-field
												label="Email"
												:rules="emailRules"
												placeholder="...@gmail.com"
												filled
												color="primary"
											></v-text-field>
										</v-col>
									</v-row>
									<v-row :align="alignment" :justify="justify">
										<!-- DOB -->
										<v-col cols="12" md="4" lg="4">
											<v-menu v-model="menu1" :close-on-content-click="false" max-width="290">
												<template v-slot:activator="{ on }">
													<v-text-field
														:value="computedDateFormattedMomentjs"
														clearable
														label="Date of Birth"
														readonly
														v-on="on"
														filled
														color="primary"
														@click:clear="date = null"
													></v-text-field>
												</template>
												<v-date-picker v-model="date" @change="menu1 = false"></v-date-picker>
											</v-menu>
										</v-col>
										<!-- Gender -->

										<v-col cols="12" sm="6" md="4">
											<v-select :items="gender" filled label="Female"></v-select>
										</v-col>
									</v-row>
								</v-card>

								<v-btn color="primary" @click="e1 = 2">Continue</v-btn>

								<v-btn text>Cancel</v-btn>
							</v-stepper-content>
							<!-- Personal Info -->
							<v-stepper-content step="2">
								<v-card class="mb-12" height="400px">
									<v-row :align="alignment" :justify="justify">
										<v-col cols="12" sm="6" md="4">
											<v-text-field
												label="Identification"
												v-model="identification"
												placeholder="Id or Passport"
												filled
												color="primary"
											></v-text-field>
										</v-col>
										<v-col cols="12" sm="6" md="4">
											<v-text-field
												label="KRA Pin"
												v-model="kraPin"
												placeholder="AR900..."
												filled
												color="primary"
											></v-text-field>
										</v-col>
									</v-row>
									<v-row :align="alignment" :justify="justify">
										<v-col cols="12" sm="6" md="4">
											<v-text-field label="Occupation" v-model="identification" filled color="primary"></v-text-field>
										</v-col>
										<v-col cols="12" sm="6" md="4">
											<v-select :items="maritalStatus" filled label="Marital Status"></v-select>
										</v-col>
									</v-row>
									<v-row :align="alignment" :justify="justify"></v-row>
								</v-card>

								<v-btn color="primary" @click="CreateMember()">Continue</v-btn>

								<v-btn @click="e1 = 1" text>Back</v-btn>
							</v-stepper-content>
							<!-- Payments Details -->
							<v-stepper-content step="3">
								<v-card class="mb-12" height="400px"></v-card>

								<v-btn color="accent" @click="SubmitPay()">Continue</v-btn>

								<v-btn @click="e1 = 2" text>Back</v-btn>
							</v-stepper-content>
						</v-stepper-items>
					</v-stepper>
				</v-col>
			</v-row>
		</v-container>
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import moment from "moment";
import Axios from "axios";

@Component
export default class Onboarding extends Vue {
	e1 = 1;
	alignment = "center";
	justify = "center";
	valid = false;
	firstname = "";
	lastname = "";
	secondname = "";
	nameRules = [
		(v: any) => !!v || "Name is required",
		(v: any) => v.length <= 10 || "Name must be less than 10 characters"
	];
	phoneRules = [
		(v: any) => !!v || "Phone number is required",
		(v: any) => v.length <= 9 || "Incorrect phone number"
	];
	email = "";
	emailRules = [
		(v: any) => !!v || "E-mail is required",
		(v: any) => /.+@.+/.test(v) || "E-mail must be valid"
	];
	items = ["Mr", "Mrs", "Miss"];
	date = new Date().toISOString().substr(0, 10);
	menu1 = false;
	menu2 = false;
	gender = ["Male", "Female"];
	identification = "";
	kraPin = "";
	maritalStatus = ["Single", "Married"];
	occupation = "";
	finished = false;
    phone = "";
    token = this.$store.state.token
	get computedDateFormattedMomentjs() {
		return this.date ? moment(this.date).format("DD/MM/YYYY") : "";
	}
	SubmitPay() {
		this.finished = true;
	}
	CreateMember() {
        let auth = {
			username: this.token,
			password: ''
		};
		this.$store.commit("set_animation", true);
		Axios({
			url: "http://127.0.0.1:8000/api/registerMember",
			data: {
				name:
					this.firstname +
					" " +
					this.secondname +
					" " +
					this.lastname,
				address: "kinoo",
				phone_no: this.phone,
				mobile_no: this.phone,
				email: this.email,
				dob: this.date,
				home_address: "eldoret",
				location: "Muthiga"
			},
            method: "POST",
            auth: auth
		})
			.then(res => {
				this.$store.commit("set_animation", false);
                this.e1 = 3;
                alert(res.data)
				
			})
			.catch(err => {
				this.$store.commit("set_animation", false);
			});
	}
}
</script>

<style scoped>
.v-stepper__header {
	box-shadow: none;
	border-color: grey !important;
}
</style>
