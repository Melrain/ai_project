'use client';

import { buyProduct, getProductById } from '@/lib/actions/product.action';
import React, { useEffect, useState } from 'react';
import Spinner from '../shared/Spinner';
import Image from 'next/image';
import { Separator } from '../ui/separator';
import { ArrowLeftCircle, Computer, Share, Tag } from 'lucide-react';
import { IconCashRegister, IconVip } from '@tabler/icons-react';
import { Button } from '../ui/button';
import Autoplay from 'embla-carousel-autoplay';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { useAuth } from '@clerk/nextjs';
import { getUserByClerkId } from '@/lib/actions/user.action';
import Link from 'next/link';

interface Props {
  productId: string;
}
const SingleProduct = ({ productId }: Props) => {
  const [isFetching, setIsFetching] = useState(false);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [product, setProduct] = useState<any>(null);
  const [images, setImages] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  const { userId } = useAuth();

  const onPurchase = async () => {
    try {
      setIsPurchasing(true);
      if (!userId) {
        console.log('Please login first');
        return;
      }

      if (user.balance < product.price) {
        return alert('余额不足，请前往充值页面充值');
      }
      if (user.level < product.levelRequirement) {
        return alert('等级不够，请提升等级');
      }
      if (user.products.some((product: { _id: string }) => product._id === productId[0])) {
        return alert('已经购买过了');
      }
      const response = await buyProduct({ userClerkId: userId, productId });
      console.log(response);
    } catch (error) {
      console.error(error);
    } finally {
      setIsPurchasing(false);
    }
  };

  // get user by id
  useEffect(() => {
    const fetchUser = async () => {
      try {
        // const user = await getUserById(userId);
        // console.log(user);
        const result = await getUserByClerkId(userId!);
        console.log(result);
        if (!result) {
          return setUser(null);
        }
        setUser(result.user);
        console.log(user);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUser();
  }, [userId]);

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
              <Link
                href={'/products'}
                className='w-full justify-start items-center gap-1 flex max-w-lg text-slate-500 text-sm px-4'
              >
                <ArrowLeftCircle />
                产品列表
              </Link>
              <Carousel
                className='max-sm:max-w-xs flex justify-center items-center mt-5 max-w-lg'
                plugins={[
                  Autoplay({
                    delay: 5000
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
              {/* userinfo */}
              <div className='flex flex-row gap-2 justify-start items-center'>
                <p className='text-white text-sm'>您的余额:{user.balance}</p>
                <Link className='text-sm text-center' href={'/topup'}>
                  充值
                </Link>
              </div>
              <div className='mt-5 flex max-w-lg justify-center w-full gap-4 rounded-t-[3px] px-5'>
                {user.products.some((product: any) => product._id === productId[0]) ? (
                  <Button
                    disabled={true}
                    className='w-2/3 text-center hover:bg-primary-500 bg-blue-700 rounded-[4px] text-white py-1'
                  >
                    您已购买该产品
                  </Button>
                ) : (
                  <Button
                    disabled={isPurchasing}
                    className='w-2/3 text-center hover:bg-primary-500 bg-blue-700 rounded-[4px] text-white py-1'
                    onClick={() => {
                      onPurchase();
                    }}
                  >
                    {isPurchasing ? '购买中...' : '购买'}
                  </Button>
                )}

                <Button className='w-1/3 hover:text-black text-white flex flex-row justify-center gap-1 text-center bg-slate-500 rounded-[4px] py-1'>
                  <Share className=' size-5' />
                  分享
                </Button>
              </div>
              <div className='mb-44'>
                <div className='text-center text-sm text-muted-foreground mt-5'>
                  <span>产品详情</span>
                </div>
                <div className='text-start  text-sm text-muted-foreground mt-5 px-5'>
                  <span>{product.description}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className='w-full text-center'>Not found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SingleProduct;
