import { api } from "../configs/axiosConfig.js"
import { defineCancelApiObject } from "../configs/axiosUtils.js"

export const ChecklistApi = {
    get: async function (id, cancel = false) {
        const response = await api.request({
            url: "/checklist/" + id,
            method: "GET",
            signal: cancel ? cancelApiObject[this.get.name].handleRequestCancellation().signal : undefined,
        })
        return response.data;
    },
    getAll: async function (cancel = false) {
        const response = await api.request({
            url: "/checklist/",
            method: "GET",
            signal: cancel ? cancelApiObject[this.getAll.name].handleRequestCancellation().signal : undefined,
        })
        return response.data;
    },
    create: async function (data, cancel = false) {
        await api.request({
            url: `/checklist`,
            method: "POST",
            data,
            signal: cancel ? cancelApiObject[this.create.name].handleRequestCancellation().signal : undefined,
        })
    },
    update: async function (data, cancel = false) {
        await api.request({
            url: `/checklist`,
            method: "PATCH",
            data,
            signal: cancel ? cancelApiObject[this.create.name].handleRequestCancellation().signal : undefined,
        })
    },
    delete: async function (id, cancel = false) {
        await api.request({
            url: `/checklist/` + id,
            method: "DELETE",
            signal: cancel ? cancelApiObject[this.create.name].handleRequestCancellation().signal : undefined,
        })
    }
}

const cancelApiObject = defineCancelApiObject(ChecklistApi)