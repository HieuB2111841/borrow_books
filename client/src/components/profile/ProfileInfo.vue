<template>
  <div class="p-3">
    <div class="card">
      <div class="card-header text-center">
        <h2>User Profile</h2>
      </div>
      <div class="card-body">
        <div class="row mb-3">
          <div class="col-md-6">
            <strong>First Name:</strong>
            <p>{{ user.firstName }}</p>
          </div>
          <div class="col-md-6">
            <strong>Last Name:</strong>
            <p>{{ user.lastName }}</p>
          </div>
        </div>
        <div class="row mb-3">
          <div class="col-md-6">
            <strong>Birthday:</strong>
            <p>{{ user.birthday }}</p>
          </div>
          <div class="col-md-6">
            <strong>Gender:</strong>
            <p>{{ user.isMale ? 'Male' : 'Female' }}</p>
          </div>
        </div>
        <div class="row mb-3">
          <div class="col-md-6">
            <strong>Phone Number:</strong>
            <p>{{ user.phoneNumber }}</p>
          </div>
          <div class="col-md-6">
            <strong>Address:</strong>
            <p>{{ user.address }}</p>
          </div>
        </div>
        <button 
          class="btn btn-primary" 
          @click="editProfile"
        >
          Edit Profile
        </button>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'ProfileInfo',
  
  data() {
    return {
      user: {
        firstName: 'John',
        lastName: 'Doe',
        birthday: '1990-01-01',
        isMale: true,
        phoneNumber: '0123456789',
        address: '123 Main St',
      }
    };
  },
  
  methods: {
    editProfile() {
      alert('Edit profile functionality is under development.');
    }
  }
};

</script>
