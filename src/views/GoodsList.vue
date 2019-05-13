<template>
    <div>
      <nav-header></nav-header>
      <nav-bread>
        <span>Goods</span>
      </nav-bread>
      <div class="accessory-result-page accessory-page">
        <div class="container">
          <div class="filter-nav">
            <span class="sortby">Sort by:</span>
            <a href="javascript:void(0)" class="default cur">Default</a>
            <a href="javascript:void(0)" class="price" @click="sortGoods">Price <svg class="icon icon-arrow-short" v-bind:class="{'sort-up':!sortFlag}"><use xlink:href="#icon-arrow-short"></use></svg></a>
            <a href="javascript:void(0)" class="filterby stopPop" @click="showFilterPop">Filter by</a>
          </div>
          <div class="accessory-result">
            <!-- filter -->
            <div class="filter stopPop" id="filter" v-bind:class="{'filterby-show':filterBy}">
              <dl class="filter-price">
                <dt>Price:</dt>
                <dd><a href="javascript:void(0)" @click="setPriceFilter('all')" v-bind:class="{'cur':priceChecked==='all'}">All</a></dd>
                <dd v-for="(price,index) in priceFilter" >
                  <a href="javascript:void(0)" @click="setPriceFilter(index)" v-bind:class="{'cur':priceChecked===index}" >{{price.startPrice}} - {{price.endPrice}}</a>
                </dd>
              </dl>
            </div>

            <!-- search result accessories list -->
            <div class="accessory-list-wrap">
              <div class="accessory-list col-4">
                <ul>
                  <li v-for="(item,index) in goodsList">
                    <div class="pic">
                      <a href="#"><img v-bind:style="imageStyle" v-lazy="'/static/' + item.productImage" :key="'/static/' + item.productImage" alt=""></a>
                    </div>
                    <div class="main">
                      <!--<div class="">{{item.productImg}}</div>-->
                      <div class="name">{{item.productName}}</div>
                      <div class="price">${{item.salePrice}}</div>
                      <div class="btn-area">
                        <a href="javascript:;" class="btn btn--m" @click="addCart(item.productId)">Add to cart</a>
                      </div>
                    </div>
                  </li>
                </ul>
                <div class="load-more"v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="20">
                  <img src="./../assets/loading-spinning-bubbles.svg" v-show="loading">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="md-overlay" v-show="overlayFlag" @click="closePop"></div>
      <nav-footer></nav-footer>
    </div>
</template>
<style>
  .load-more{
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  .sort-up{
    transform:rotate(180deg);
    transition: all .3s ease-out;
  }
  .btn:hover {
    background-color: grey;
    color: white;
    border-color: grey;
    transition: all .3s ease-out;
  }
</style>
<script>
    import './../assets/css/base.css';
    import './../assets/css/product.css';

    import NavHeader from '@/components/NavHeader.vue';
    import NavFooter from '@/components/NavFooter.vue';
    import NavBread from '@/components/NavBread.vue';
    import axios from 'axios';
    export default {
        data() {
            return {
                goodsList: [],
                priceFilter: [
                  {
                    startPrice:'0',
                    endPrice:'500'
                  },
                  {
                    startPrice:'500',
                    endPrice:'1000'
                  },
                  {
                    startPrice:'1000',
                    endPrice:'2000'
                  },
                ],
                priceChecked: 'all',
                filterBy:false,
                overlayFlag:false,
                sortFlag:true,
                page:1,
                pageSize:8,
                busy:true,
                loading:true,
                imageStyle:{
                  // width: '225px',
                  // height: '250px',
                  marginLeft: 'auto',
                  marginRight: 'auto'
                },

            }
        },
        components: {
          NavHeader,
          NavFooter,
          NavBread
        },
        mounted: function () {
          this.getGoodsList();
        },
        methods: {
          getGoodsList(flag) {
            let param = {
              page: this.page,
              pageSize: this.pageSize,
              sort: this.sortFlag? 1 : -1,
              priceLevel: this.priceChecked
            }
            this.loading = true;
            console.log(this.loading);
            axios.get("/goods", {
              params:param
            }).then((response) => {
              let res = response.data.result;
              this.loading = false;
              console.log(this.loading);
              console.log(response)
              if (response.status == '201') {
                if (flag) {
                  this.goodsList = [...this.goodsList,...res];
                  console.log(res.length)
                  if (res.length == 0) {
                    this.busy = true;
                  } else {
                    this.busy = false;
                  }
                } else {
                  this.goodsList = [...res];
                  this.busy = false;
                }
              } else {
                this.goodsList = []
              }
            })
          },
          showFilterPop() {
            this.filterBy = true,
            this.overlayFlag = true
          },
          setPriceFilter(index) {
            this.priceChecked = index,
            this.page = 1;
            this.getGoodsList()
            this.closePop();
          },
          closePop() {
            this.filterBy = false,
            this.overlayFlag = false
          },
          sortGoods() {
            this.sortFlag = !this.sortFlag;
            this.page = 1;
            this.getGoodsList();
          },
          loadMore() {
            this.busy=true;
            setTimeout(() => {
              this.page++;
              this.getGoodsList(true)
            }, 500);
          },
          addCart(productId) {
            axios.post("/goods/addCart", {
              productId: productId
            }).then((response) => {
              if (response.status == '200') {
                alert('success');
              } else {
                alert('failure')
              }
            })
          }
        }
    }
</script>

