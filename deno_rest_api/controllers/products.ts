import { v4 } from 'https://deno.land/std/uuid/mod.ts'
import { Product } from '../types.ts'
let products: Product[] = [
    {
        id: "1",
        name: "Product One",
        description: "This is product one",
        price: 29.99,
    },
    {
        id: "2",
        name: "Product Two",
        description: "This is product two",
        price: 39.99,
    },
    {
        id: "3",
        name: "Product Three",
        description: "This is product three",
        price: 49.99,
    },
    {
        id: "4",
        name: "Product Four",
        description: "This is product four",
        price: 59.99,
    },
    {
        id: "5",
        name: "Product Five",
        description: "This is product five",
        price: 69.99,
    },
    {
        id: "6",
        name: "Product Six",
        description: "This is product six",
        price: 79.99,
    },
];

// @desc    Get all products
// @route   GET /api/v1/products
const getProducts = ({response}: {response:any}) => {
    response.body = {
        success: true,
        data: products
    }
}
// @desc    Get single products
// @route   GET /api/v1/product/:id
const getProduct = ({params, response}: {params: {id: string}, response: any}) => {
    const product: Product | undefined = products.find(p => p.id == params.id)
    if(product) {
        response.status = 200
        response.body = {
            success: true,
            data: product
        }
    }else {
        response.status = 404
        response.body = {
            success: false,
            msg: 'No Product Found'
        }
    }
}
// @desc    add product
// @route   POST /api/v1/product
const addProduct = async ({request, response}: {request:any, response:any}) => {
    const body = await request.body()
    if(!request.hasBody){
        request.status = 400
        request.body = {
            success: false,
            msg: 'No Data'
        }
    } else {
        const product: Product = body.value
        product.id = v4.generate()
        products.push(product)
        response.status = 201
        response.body = {
            success: true,
            data: product
        }
    }
}
// @desc    update product
// @route   PUT /api/v1/product/:id
const updateProduct = async({params,request, response}: {params: {id: string}, request:any, response:any}) => {
    const product: Product | undefined = products.find(p => p.id == params.id)
    if(product) {
        const body = await request.body()
        const updateData: {name?: string, description?:string, price?:number} = body.value
        products = products.map(p =>p.id === params.id ? {...p,...updateData} : p)
        response.status = 200
        response.body = {
            success: true,
            data: products
        }
    }else {
        response.status = 404
        response.body = {
            success: false,
            msg: 'No Product Found'
        }
    }
}
// @desc    delete product
// @route   PUT /api/v1/product/:id
const deleteProduct = ({params, response}: {params: {id: string}, response: any}) => {
    products = products.filter(p => p.id !== params.id)
    response.body = {
        success: true,
        msg: 'Product removed'
    }
}
export {getProducts, getProduct, addProduct, updateProduct, deleteProduct}