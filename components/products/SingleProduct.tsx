'use client';

import { getProductById } from '@/lib/actions/product';
import React, { useEffect, useState } from 'react';
import Spinner from '../shared/Spinner';
import Image from 'next/image';
import { Separator } from '../ui/separator';
import { Computer, Share, Tag } from 'lucide-react';
import { IconCashRegister, IconVip } from '@tabler/icons-react';
import { Button } from '../ui/button';
import Autoplay from 'embla-carousel-autoplay';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

interface Props {
  productId: string;
}
const SingleProduct = ({ productId }: Props) => {
  const [isFetching, setIsFetching] = useState(false);
  const [product, setProduct] = useState<any>(null);
  const [images, setImages] = useState<any>(null);
  useEffect(() => {
    const fetchProduct = async () => {
      setIsFetching(true);
      try {
        const product = await getProductById(productId);
        if (!product) {
          setProduct(null);
        }
        setProduct(product);
        console.log(product);
      } catch (error) {
        console.error(error);
      } finally {
        setIsFetching(false);
      }
    };
    fetchProduct();
  }, []);

  // fetch images from ipfs
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(product.pictureCollection);
        const data = await response.json();
        // turning the data into an array
        const images = Object.values(data);
        setImages(images);
        console.log(images);
      } catch (error) {
        console.error(error);
      }
    };
    fetchImages();
  }, [product]);

  return (
    <div className='w-full'>
      {isFetching ? (
        <div className='flex mt-44 justify-center items-center'>
          <Spinner />
        </div>
      ) : (
        <div>
          {product ? (
            <div className='flex  flex-col justify-center items-center  w-full'>
              <Carousel
                className='max-sm:max-w-xs flex justify-center items-center max-w-lg'
                plugins={[
                  Autoplay({
                    delay: 2000
                  })
                ]}
                opts={{
                  align: 'start',
                  loop: true
                }}
              >
                <CarouselPrevious />
                <CarouselContent>
                  {images?.map((image: any, index: number) => (
                    <CarouselItem key={index} className='flex justify-center'>
                      <Image
                        src={image}
                        height={200}
                        width={320}
                        alt={product.name}
                        className='rounded-[4px] h-[200px] w-[320px]  object-cover'
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselNext />
              </Carousel>
              {/* <Image src={product.picture} height={200} width={200} alt={product.name} /> */}
              <div className='pt-2 text-xs text-muted-foreground flex gap-3 mt-2  justify-center flex-col items-start  '>
                <span className='font-semibold text-foreground text-xl flex flex-row gap-1 items-center'>
                  <Computer className='text-slate-500' /> 产品:
                  <span className='text-green-500'>{product.name}</span>
                </span>
                <span className='font-semibold text-foreground text-xl flex flex-row gap-1 items-center'>
                  <IconVip className='text-slate-500' /> 购买资质:
                  <span className='text-green-500'>Lv {product.levelRequirement}</span>
                </span>
                <span className='font-semibold text-foreground text-xl flex flex-row gap-1 items-center'>
                  <Tag className='text-slate-500' /> 价格:
                  <span className='text-green-500'>${product.price}</span>
                </span>
                <span className='font-semibold text-foreground text-xl flex flex-row gap-1 items-center'>
                  <IconCashRegister className='text-slate-500' /> 每日收益:
                  <span className='text-green-500'>{product.revenuePerDay}/天</span>
                </span>
              </div>
              <Separator className='my-5' />
              <div className=' flex max-w-lg justify-center w-full gap-4 rounded-t-[3px] px-5'>
                <Button className='w-2/3 text-center bg-blue-700 rounded-[4px] text-white py-1'>点击购买</Button>
                <Button className='w-1/3 text-white flex flex-row justify-center gap-1 text-center bg-slate-500 rounded-[4px] py-1'>
                  <Share className=' size-5' />
                  分享
                </Button>
              </div>
              <div className='mb-44'>
                <div className='text-center text-sm text-muted-foreground mt-5'>
                  <span>产品详情</span>
                </div>
                <div className='text-center text-sm text-muted-foreground mt-5'>
                  <span>{product.description}</span>
                </div>
              </div>
            </div>
          ) : (
            <div>Not found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SingleProduct;
