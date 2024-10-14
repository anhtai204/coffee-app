import { Body, Controller, Get, Param, Post, Query, Res } from "@nestjs/common";
import { ResponseData } from "src/global/globalClass";
import { HttpMessage, HttpStatus } from "src/global/gobalEnum";
import { ProductToppingService } from "./product_topping.service";

@Controller('rate')
export class ProductToppingController{
    constructor(private readonly productToppingService: ProductToppingService){}



}