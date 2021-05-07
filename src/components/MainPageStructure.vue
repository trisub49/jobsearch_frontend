<template>

    <div class="mainpagestructure">
        <div id="container" class="container">
            <div class="row">
                <div id="page" class="col-xl-8 col-lg-8 col-md-8">
                    <div v-if="title.length">
                        <h4><b>{{title}}</b></h4>
                        <hr>
                    </div>
                    <slot></slot>
                </div>
                <div id="makemoney" class="d-none d-sm-none d-md-block d-lg-block d-xl-block col-xl-3 col-lg-3 col-md-3">
                <h4><b>Reklám</b></h4>
                    <hr>
                    Itt lesznek a reklámok
                </div>
            </div>
        </div>  
    </div>

</template>

<script>

export default {

    name: 'mainpagestructure',
    
    props: [
        'title'
    ]
}

</script>
