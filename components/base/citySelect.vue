<template>
	<div class="citySelect">
		<div class="linkage">
		    <el-select v-model="sheng" @change="choseProvince" placeholder="Province">
		      	<el-option v-for="item in province" :key="item.id" :label="item.value" :value="item.id"></el-option>
		    </el-select>
		    <el-select v-model="shi" @change="choseCity" placeholder="City">
			    <el-option v-for="item in shi1" :key="item.id" :label="item.value" :value="item.id"></el-option>
		    </el-select>
		    <!-- <el-select v-model="qu" @change="choseBlock" placeholder="District">
			    <el-option v-for="item in qu1" :key="item.id" :label="item.value" :value="item.id"></el-option>
		    </el-select> -->
		</div>	
	</div>
</template>
<script>
	import mapJson from '~/static/json/map.json'
	export default {
		props: {
			provinceProps: {
                type: [Number,String],
                default: ''
            },
            cityProps: {
                type: [Number,String],
                default: ''
            }
		},
		data () {
		return {
			mapJson: mapJson,
			province:'',
			sheng: this.provinceProps,
			shi: this.cityProps,
			shi1: [],
			qu: '',
			qu1: [],
			city:'',
			block:'',
		}
	  },
	  mounted() {
	  	// var that = this;
	  	// that.setId(that.provinceProps);
	  	// // var that = that;
	  	// that.choseProvince(that.sheng);
	  	// setTimeout(function() {
	  	// 	that.setId2(that.cityProps);
	  	// 	setTimeout(function() {
	  	// 		that.choseCity(that.shi);
	  	// 	},300);
	  	// },300);
	  },
	  methods:{
	    // 加载china地点数据，三级
	    getCityData:function(){
	        var that = this
            var data = that.mapJson;
            that.province = [];
            that.city = [];
            that.block = [];
            // 省市区数据分类
            for (var item in data) {
              if (item.match(/0000$/)) {//省
                that.province.push({id: item, value: data[item], children: []})
              } else if (item.match(/00$/)) {//市
                that.city.push({id: item, value: data[item], children: []})
              } else {//区
                that.block.push({id: item, value: data[item]})
              }
            }
            // 分类市级
            for (var index in that.province) {
              for (var index1 in that.city) {
                if (that.province[index].id.slice(0, 2) === that.city[index1].id.slice(0, 2)) {
                  that.province[index].children.push(that.city[index1])
                }
              }
            }
            // 分类区级
            for(var item1 in that.city) {
              for(var item2 in that.block) {
                if (that.block[item2].id.slice(0, 4) === that.city[item1].id.slice(0, 4)) {
                  that.city[item1].children.push(that.block[item2])
                }
              }
            }
	    },
	    // 选省
	    choseProvince:function(e) {
	        for (var index2 in this.province) {
	          if (e === this.province[index2].id) {
	            this.shi1 = this.province[index2].children
	            this.shi = this.province[index2].children[0].value
	            this.qu1 =this.province[index2].children[0].children
	            this.qu = this.province[index2].children[0].children[0].value
	            this.E = this.qu1[0].id
	          }
	        }
	        // console.log(this.shi1);
	        // console.log(this.shi);
	        // console.log(this.qu1);
	        // console.log(this.qu);
	        // console.log(this.E);
	       	// 修改省份
	        this.$emit("changeProvince",this.mapJson[e]);
	        // 修改城市
	        this.$emit("changeCity",this.shi);
	    },
	    // 选市
	    choseCity:function(e) {
	        for (var index3 in this.city) {
	          if (e === this.city[index3].id) {
	            this.qu1 = this.city[index3].children
	            this.qu = this.city[index3].children[0].value
	            this.E = this.qu1[0].id
	            // console.log(this.E)
	          }
	        }
	        console.log(this.qu1);
	        console.log(this.qu);
	        console.log(this.E);
	        this.$emit("changeCity",this.mapJson[e]);
	    },
	    // 选区
	    choseBlock:function(e) {
	        this.E=e;
	        // console.log(this.E)
	    },
	    // 设置省市的id
	    setId(sheng) {
	    	var data = this.mapJson;
	    	for (var item in data) {
              if (sheng == data[item]) {//省
                this.sheng = item;
              }
            }
	    },
	    setId2(shi) {
	    	var data = this.mapJson;
	    	for (var item in data) {
              if (shi == data[item]) {//市
              	this.shi = item;
              }
            }
	    }
	},
	created:function(){
	      	this.getCityData()
	    }
	}
</script>

<style lang='sass' scoped>
	@import '~/assets/sass/common.sass'

</style>
