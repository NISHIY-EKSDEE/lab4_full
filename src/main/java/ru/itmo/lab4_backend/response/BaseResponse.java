package ru.itmo.lab4_backend.response;

public class BaseResponse {

    private String status;
    private Integer code;

    public BaseResponse() {
    }

    public BaseResponse(String status, Integer code){
        this.status = status;
        this.code = code;
    }

    public String getStatus() {
        return status;
    }

    public Integer getCode() {
        return code;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public void setCode(Integer code) {
        this.code = code;
    }
}
