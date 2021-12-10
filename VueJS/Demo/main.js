var vueInstance = new Vue({
    el: '#app',
    data: {
        title: 'Áo tthun nam thể thao hàng VNXK vải dày mịn - Vải Đốm',
        url: 'https://www.lazada.vn/products/ao-thun-nam-the-thao-hang-vnxk-vai-day-min-vai-dom-i265780948-s382816279.html',
        target: '_blank',
        price: 20000,
        check: true,
        count: 0,
        clientX: 0,
        clientY: 0,
        firstName: '',
        textarea: '',
        isActive: true,
        isError: false,
        activeColor: 'red',
        fontSize: 20,
        background: 'https://img.freepik.com/free-vector/hand-painted-watercolor-pastel-sky-background_23-2148902771.jpg?size=626&ext=jpg',
        tabSelected: 'login',
        sale: 0.1,
        selectedProduct: 2,
        cardNumber: 1,
        listProductDetail: [
            {
                image: './images/red.jpg',
                quantity: 0,
                textColor: 'Màu Đỏ'
            }, {
                image: './images/blue.jpg',
                quantity: 8,
                textColor: 'Màu Xanh'
            }, {
                image: './images/black.jpg',
                quantity: 2,
                textColor: 'Màu Đen'
            },
        ],
        listDesc: [
            'Chất liệu: polyester và thun',
            'Thoát mồ hôi tốt',
            'Áo thun cổ tròn thể thao Hiye chuyên được may từ chất liệu nilon thoáng mát',
            'Kết hợp thêm sợi thun tạo độ co giãn giúp người tiêu dùng thoải mái khi mặc',
            'Chất liệu: polyester và thun'
        ],
        description: '<p>M&ocirc; tả: &Aacute;o thun cổ tr&ograve;n thể thao Hiye chuy&ecirc;n được may từ chất liệu nilon tho&aacute;ng m&aacute;t v&agrave; tho&aacute;t mồ h&ocirc;i tốt, kết hợp th&ecirc;m sợi thun tạo độ co gi&atilde;n gi&uacute;p người ti&ecirc;u d&ugrave;ng thoải m&aacute;i khi mặc</p> ',
        testDescription: `<p>Test hjskhfk h</p>

        <p><strong><span style="background-color:#8e44ad">fhsdjkfhsk&nbsp; hsdjkfk&nbsp;</span></strong></p>`,
        listBlogs: [
            {
                "userId": 1,
                "id": 1,
                "title": "Title",
                "body": "Bodyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy"
            },
            {
                "userId": 1,
                "id": 1,
                "title": "Title",
                "body": "Bodyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy"
            },
            {
                "userId": 1,
                "id": 1,
                "title": "Title",
                "body": "Bodyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy"
            },
            {
                "userId": 1,
                "id": 1,
                "title": "Title",
                "body": "Bodyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy"
            },
            {
                "userId": 1,
                "id": 1,
                "title": "Title",
                "body": "Bodyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy"
            },
            {
                "userId": 1,
                "id": 1,
                "title": "Title",
                "body": "Bodyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy"
            }
        ],
        scores: {
            math: 9.0,
            english: 10.0,
            physics: 7
        },
        arrUsers: [
            { email: 'abc', isActive: false},
            { email: 'abc', isActive: true},
            { email: 'abc', isActive: false},
            { email: 'abc', isActive:true},
            { email: 'abc', isActive: false}
        ]
    },
    methods: {
        handleClickColor(e, index) {
            this.selectedProduct = index;
            console.log(index);
            // console.log(e, index, this);
        },
        classActive(index) {
            return {
                active: this.selectedProduct === index
            }
        },
        handleAddToCart() {
            if (this.getProduct.quantity <= 0) {
                alert('Sản phẩm đã hết');
            } else {
                this.cardNumber += 1;
                // this.listProductDetail.quantity -= 1;
            }
        },
        handleClick(e, number) {
            console.log('click', e);
            this.count += number;
        },
        handleMouseMove(e) {
            this.clientX = e.clientX;
            this.clientY = e.clientY;
        },
        handleSubmitForm(e) {
            console.log(e);
            // e.preventDefault();
        },
        handleMouseMove2(e) {
            console.log('box2', e.target);
            // e.stopPropagation();
        },
        handleKeyUp(e) {
            // this.firstName = e.target.value;
        },
        changeActive() {
            this.isActive = !this.isActive;
        },
        changeTabs(tab){
            this.tabSelected = tab;
        }
    },
    computed: {
        formatOriginalPrice() {
            var number = this.price;
            return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(number);
        },
        formatFinalPrice() {
            var number = this.price - this.sale * this.price;
            return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(number);
            // con trỏ this là đối tượng vue hiện tại
        },
        getProduct() {
            let index = this.selectedProduct;
            return this.listProductDetail[index];
        },
        reversedTitle: function () {
            return this.title.split('').reverse().join('');
        },
        objClass: function () {
            return {
                active: this.isActive,
                error: this.isError
                // tên class : active, error
                // return a object
            }
        },
        objStyle: function(){
            return {
                backgroundImage: 'url(' + this.background + ')'
            }
        },
        userIsactive: function(){
            return this.arrUsers.filter((x)=>{

                return x.isActive == true;
            });
        }
    }
});
