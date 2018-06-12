<template>
  <div class="wrapper">
    <div class="content">
      <div class="lds-css">
        <div class="lds-rolling">
          <div class="lds-circle"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Loading',
};

</script>

<style lang="scss" scoped>

  .wrapper {
    position: fixed;
    z-index: 4;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 100%;
    overflow: hidden;
    transform: translate(-50%, -50%);
    background-color: rgba(0,0,0,0.3);
    filter: drop-shadow(10px 3px 4px rgba(0,0,0,0.3));
  }

  .content {
    position: absolute;
    margin: 0;
    width: 100%;
    height: 100%;
    top: 40%;
    left: 48%;
  }
  @keyframes lds-rolling {
    0% {
      -webkit-transform: translate(-50%, -50%) rotate(0deg);
      transform: translate(-50%, -50%) rotate(0deg);
    }
    100% {
      -webkit-transform: translate(-50%, -50%) rotate(360deg);
      transform: translate(-50%, -50%) rotate(360deg);
    }
  }
  @-webkit-keyframes lds-rolling {
    0% {
      -webkit-transform: translate(-50%, -50%) rotate(0deg);
      transform: translate(-50%, -50%) rotate(0deg);
    }
    100% {
      -webkit-transform: translate(-50%, -50%) rotate(360deg);
      transform: translate(-50%, -50%) rotate(360deg);
    }
  }
  .lds-rolling {
    width:100%;
    height:100%;
    position: relative;
  }
  .lds-rolling div,
  .lds-rolling div:after {
    position: absolute;
    width: 60px;
    height: 60px;
    border: 6px solid #4fc08d;
    border-top-color: transparent;
    border-radius: 50%;
  }
  .lds-rolling div {
    -webkit-animation: lds-rolling 1s linear infinite;
    animation: lds-rolling 1s linear infinite;
    top: 60px;
    left: 60px;
  }
  .lds-rolling div:after {
    -webkit-transform: rotate(90deg);
    transform: rotate(90deg);
  }
  .lds-rolling {
    width: 60px !important;
    height: 60px !important;
    -webkit-transform: translate(-60px, -60px) scale(1) translate(60px, 60px);
    transform: translate(-60px, -60px) scale(1) translate(60px, 60px);
  }
  .lds-circle {
    margin-left: -50%;
  }
</style>

