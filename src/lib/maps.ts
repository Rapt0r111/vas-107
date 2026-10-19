import { fullAddress } from "@/config/event";

export const yandexMapsUrl = () => `https://yandex.ru/maps/?text=${encodeURIComponent(fullAddress)}`;
