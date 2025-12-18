
export interface Address {
    id: number
    title: string
    country_id: number
    region_id: number
    subregion_id: number
    full_address: string
    phone_number: string
}


export interface CreateAddressRequest {
    title: string
    country_id: number
    region_id: number
    subregion_id: number
    full_address: string
    phone_number: string
}


export interface UpdateAddressRequest {
    title: string
    country_id: number
    region_id: number
    subregion_id: number
    full_address: string
    phone_number: string
}



export interface AddressListResponse {
    count: number
    results: Address[]
}


export interface AddressResponse {
    id: number
    title: string
    country_id: number
    region_id: number
    subregion_id: number
    full_address: string
    phone_number: string
}
