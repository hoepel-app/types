export const schema = {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "definitions": {
        "Address": {
            "additionalProperties": false,
            "properties": {
                "city": {
                    "description": "The city, e.g. 'Brussels'",
                    "type": "string"
                },
                "isValid": {
                    "type": "boolean"
                },
                "number": {
                    "description": "The house number, e.g. '12A'",
                    "type": "string"
                },
                "street": {
                    "description": "The street component of the address, e.g. 'Baker Street'",
                    "type": "string"
                },
                "zipCode": {
                    "description": "The zip code of the city, e.g. '1200'",
                    "type": "number"
                }
            },
            "required": [
                "isValid"
            ],
            "type": "object"
        },
        "AgeGroup": {
            "additionalProperties": false,
            "properties": {
                "bornOnOrAfter": {
                    "$ref": "#/definitions/IDayDate"
                },
                "bornOnOrBefore": {
                    "$ref": "#/definitions/IDayDate"
                },
                "name": {
                    "type": "string"
                }
            },
            "required": [
                "bornOnOrAfter",
                "bornOnOrBefore",
                "name"
            ],
            "type": "object"
        },
        "Child": {
            "additionalProperties": false,
            "properties": {
                "birthDate": {
                    "$ref": "#/definitions/DayDate",
                    "description": "Day on which child was born as ISO 8601"
                },
                "contactPeople": {
                    "items": {
                        "additionalProperties": false,
                        "properties": {
                            "contactPersonId": {
                                "type": "string"
                            },
                            "relationship": {
                                "type": "string"
                            }
                        },
                        "required": [
                            "contactPersonId",
                            "relationship"
                        ],
                        "type": "object"
                    },
                    "type": "array"
                },
                "firstName": {
                    "type": "string"
                },
                "fullName": {
                    "type": "string"
                },
                "gender": {
                    "enum": [
                        "female",
                        "male",
                        "other"
                    ],
                    "type": "string"
                },
                "id": {
                    "type": "string"
                },
                "lastName": {
                    "type": "string"
                },
                "legacyAddress": {
                    "$ref": "#/definitions/Address"
                },
                "legacyContact": {
                    "$ref": "#/definitions/IContactInfo"
                },
                "remarks": {
                    "type": "string"
                }
            },
            "required": [
                "contactPeople",
                "firstName",
                "fullName",
                "lastName",
                "remarks"
            ],
            "type": "object"
        },
        "ContactPerson": {
            "additionalProperties": false,
            "properties": {
                "address": {
                    "$ref": "#/definitions/Address"
                },
                "firstName": {
                    "type": "string"
                },
                "fullName": {
                    "type": "string"
                },
                "id": {
                    "type": "string"
                },
                "lastName": {
                    "type": "string"
                },
                "phone": {
                    "items": {
                        "$ref": "#/definitions/IPhoneContact"
                    },
                    "type": "array"
                },
                "vcard": {
                    "type": "string"
                }
            },
            "required": [
                "address",
                "firstName",
                "fullName",
                "lastName",
                "phone",
                "vcard"
            ],
            "type": "object"
        },
        "Crew": {
            "additionalProperties": false,
            "properties": {
                "active": {
                    "type": "boolean"
                },
                "address": {
                    "$ref": "#/definitions/IAddress"
                },
                "bankAccount": {
                    "description": "Bank account of the person, preferably IBAN format",
                    "type": "string"
                },
                "birthDate": {
                    "$ref": "#/definitions/IDayDate",
                    "description": "Day on which crew member was born as ISO 8601"
                },
                "contact": {
                    "$ref": "#/definitions/IContactInfo"
                },
                "firstName": {
                    "type": "string"
                },
                "fullName": {
                    "type": "string"
                },
                "id": {
                    "type": "string"
                },
                "lastName": {
                    "type": "string"
                },
                "remarks": {
                    "type": "string"
                },
                "vcard": {
                    "type": "string"
                },
                "yearStarted": {
                    "description": "In which year the crew member started volunteering/working",
                    "type": "number"
                }
            },
            "required": [
                "active",
                "address",
                "contact",
                "firstName",
                "fullName",
                "lastName",
                "remarks",
                "vcard"
            ],
            "type": "object"
        },
        "Day": {
            "additionalProperties": false,
            "properties": {
                "date": {
                    "$ref": "#/definitions/DayDate"
                },
                "id": {
                    "type": "string"
                },
                "shifts": {
                    "items": {
                        "$ref": "#/definitions/Shift"
                    },
                    "type": "array"
                }
            },
            "required": [
                "date",
                "shifts"
            ],
            "type": "object"
        },
        "DayDate": {
            "additionalProperties": false,
            "properties": {
                "day": {
                    "type": "number"
                },
                "id": {
                    "type": "string"
                },
                "month": {
                    "type": "number"
                },
                "nativeDate": {
                    "description": "Enables basic storage and retrieval of dates and times.",
                    "format": "date-time",
                    "type": "string"
                },
                "year": {
                    "type": "number"
                }
            },
            "required": [
                "day",
                "id",
                "month",
                "nativeDate",
                "year"
            ],
            "type": "object"
        },
        "DayDateRange": {
            "additionalProperties": false,
            "properties": {
                "from": {
                    "$ref": "#/definitions/DayDate"
                },
                "to": {
                    "$ref": "#/definitions/DayDate"
                }
            },
            "required": [
                "from",
                "to"
            ],
            "type": "object"
        },
        "IAddress": {
            "additionalProperties": false,
            "description": "A physical street address",
            "properties": {
                "city": {
                    "description": "The city, e.g. 'Brussels'",
                    "type": "string"
                },
                "number": {
                    "description": "The house number, e.g. '12A'",
                    "type": "string"
                },
                "street": {
                    "description": "The street component of the address, e.g. 'Baker Street'",
                    "type": "string"
                },
                "zipCode": {
                    "description": "The zip code of the city, e.g. '1200'",
                    "type": "integer"
                }
            },
            "type": "object"
        },
        "IAgeGroup": {
            "additionalProperties": false,
            "properties": {
                "bornOnOrAfter": {
                    "$ref": "#/definitions/IDayDate"
                },
                "bornOnOrBefore": {
                    "$ref": "#/definitions/IDayDate"
                },
                "name": {
                    "type": "string"
                }
            },
            "required": [
                "bornOnOrAfter",
                "bornOnOrBefore",
                "name"
            ],
            "type": "object"
        },
        "IAppMetadata": {
            "additionalProperties": false,
            "properties": {
                "tenants": {
                    "items": {
                        "additionalProperties": false,
                        "properties": {
                            "name": {
                                "type": "string"
                            },
                            "permissions": {
                                "items": {
                                    "type": "string"
                                },
                                "type": "array"
                            },
                            "roles": {
                                "items": {
                                    "type": "string"
                                },
                                "type": "array"
                            }
                        },
                        "required": [
                            "name",
                            "permissions",
                            "roles"
                        ],
                        "type": "object"
                    },
                    "type": "array"
                }
            },
            "required": [
                "tenants"
            ],
            "type": "object"
        },
        "IAuditLogData": {
            "additionalProperties": false,
            "description": "Extra information about the logged action",
            "properties": {
                "childAbsorbedIntoId": {
                    "type": "string"
                },
                "childId": {
                    "type": "string"
                },
                "childRetiredId": {
                    "type": "string"
                },
                "contactPersonId": {
                    "type": "string"
                },
                "crewId": {
                    "type": "string"
                },
                "dayId": {
                    "type": "string"
                },
                "tenantName": {
                    "type": "string"
                },
                "userId": {
                    "type": "string"
                },
                "year": {
                    "type": "number"
                }
            },
            "type": "object"
        },
        "IAuditLogEntry": {
            "additionalProperties": false,
            "description": "An entry in the audit log. The audit log system helps to see which crew members took certain actions",
            "properties": {
                "data": {
                    "$ref": "#/definitions/IAuditLogData"
                },
                "eventId": {
                    "type": "string"
                },
                "loggedBy": {
                    "type": "string"
                },
                "receivedTimestamp": {
                    "type": "number"
                },
                "timestamp": {
                    "type": "number"
                },
                "triggeredBy": {
                    "additionalProperties": false,
                    "properties": {
                        "id": {
                            "type": "string"
                        },
                        "jwt": {
                            "type": "string"
                        },
                        "name": {
                            "type": "string"
                        },
                        "tenantId": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "jwt",
                        "tenantId"
                    ],
                    "type": "object"
                }
            },
            "required": [
                "data",
                "eventId",
                "loggedBy",
                "receivedTimestamp",
                "timestamp",
                "triggeredBy"
            ],
            "type": "object"
        },
        "IChild": {
            "additionalProperties": false,
            "properties": {
                "birthDate": {
                    "$ref": "#/definitions/IDayDate",
                    "description": "Day on which child was born as ISO 8601"
                },
                "contactPeople": {
                    "items": {
                        "additionalProperties": false,
                        "properties": {
                            "contactPersonId": {
                                "type": "string"
                            },
                            "relationship": {
                                "description": "The relationship between the person and the contact person. E.g. 'Father', 'Grandparent'",
                                "type": "string"
                            }
                        },
                        "required": [
                            "contactPersonId",
                            "relationship"
                        ],
                        "type": "object"
                    },
                    "type": "array"
                },
                "firstName": {
                    "type": "string"
                },
                "gender": {
                    "enum": [
                        "female",
                        "male",
                        "other"
                    ],
                    "type": "string"
                },
                "id": {
                    "type": "string"
                },
                "lastName": {
                    "type": "string"
                },
                "legacyAddress": {
                    "$ref": "#/definitions/IAddress",
                    "description": "A physical street address"
                },
                "legacyContact": {
                    "$ref": "#/definitions/IContactInfo"
                },
                "remarks": {
                    "type": "string"
                }
            },
            "required": [
                "contactPeople",
                "firstName",
                "lastName",
                "remarks"
            ],
            "type": "object"
        },
        "IContactInfo": {
            "additionalProperties": false,
            "properties": {
                "email": {
                    "items": {
                        "type": "string"
                    },
                    "type": "array"
                },
                "phone": {
                    "items": {
                        "$ref": "#/definitions/IPhoneContact"
                    },
                    "type": "array"
                }
            },
            "required": [
                "email",
                "phone"
            ],
            "type": "object"
        },
        "IContactPerson": {
            "additionalProperties": false,
            "properties": {
                "address": {
                    "$ref": "#/definitions/IAddress"
                },
                "firstName": {
                    "type": "string"
                },
                "id": {
                    "type": "string"
                },
                "lastName": {
                    "type": "string"
                },
                "phone": {
                    "items": {
                        "$ref": "#/definitions/IPhoneContact"
                    },
                    "type": "array"
                }
            },
            "required": [
                "address",
                "firstName",
                "lastName",
                "phone"
            ],
            "type": "object"
        },
        "ICrew": {
            "additionalProperties": false,
            "description": "A crew member",
            "properties": {
                "active": {
                    "type": "boolean"
                },
                "address": {
                    "$ref": "#/definitions/IAddress"
                },
                "bankAccount": {
                    "description": "Bank account of the person, preferably IBAN format",
                    "type": "string"
                },
                "birthDate": {
                    "$ref": "#/definitions/IDayDate",
                    "description": "Day on which crew member was born as ISO 8601"
                },
                "contact": {
                    "$ref": "#/definitions/IContactInfo"
                },
                "firstName": {
                    "type": "string"
                },
                "id": {
                    "type": "string"
                },
                "lastName": {
                    "type": "string"
                },
                "remarks": {
                    "type": "string"
                },
                "yearStarted": {
                    "description": "In which year the crew member started volunteering/working",
                    "type": "integer"
                }
            },
            "required": [
                "active",
                "address",
                "contact",
                "firstName",
                "lastName",
                "remarks"
            ],
            "type": "object"
        },
        "IDay": {
            "additionalProperties": false,
            "description": "A day, possibly containing shifts on that day",
            "properties": {
                "date": {
                    "$ref": "#/definitions/IDayDate"
                },
                "id": {
                    "type": "string"
                },
                "shifts": {
                    "items": {
                        "$ref": "#/definitions/IShift"
                    },
                    "type": "array"
                }
            },
            "required": [
                "date",
                "shifts"
            ],
            "type": "object"
        },
        "IDayDate": {
            "additionalProperties": false,
            "properties": {
                "day": {
                    "type": "number"
                },
                "month": {
                    "type": "number"
                },
                "year": {
                    "type": "number"
                }
            },
            "required": [
                "day",
                "month",
                "year"
            ],
            "type": "object"
        },
        "IDayDateRange": {
            "additionalProperties": false,
            "properties": {
                "from": {
                    "$ref": "#/definitions/IDayDate"
                },
                "to": {
                    "$ref": "#/definitions/IDayDate"
                }
            },
            "required": [
                "from",
                "to"
            ],
            "type": "object"
        },
        "IDetailedAttendance": {
            "additionalProperties": false,
            "properties": {
                "ageGroupName": {
                    "description": "If child is part of an age group",
                    "type": "string"
                },
                "arrived": {
                    "description": "When the child arrived to participate in an activity. Format: JS date, e.g. 2018-04-13T11:14:54.411Z",
                    "type": "string"
                },
                "arrivedRegisteredBy": {
                    "description": "Which crew member registered the child as arrived. Crew id",
                    "type": "string"
                },
                "enrolled": {
                    "description": "When the child was enrolled (intention to participate in an activity). Format: JS date (e.g. 2018-04-13T11:14:54.411Z)",
                    "type": "string"
                },
                "enrolledRegisteredBy": {
                    "description": "Who registered the child's intent to participate in an activity. Crew id",
                    "type": "string"
                },
                "left": {
                    "description": "When the child left/went home after the activity. Format: JS date, e.g. 2018-04-13T11:14:54.411Z",
                    "type": "string"
                },
                "leftRegisteredBy": {
                    "description": "Who registered the child leaving. Crew id",
                    "type": "string"
                },
                "shiftId": {
                    "description": "The shift this attendance is about",
                    "type": "string"
                }
            },
            "required": [
                "shiftId"
            ],
            "type": "object"
        },
        "IDetailedAttendancesOnDay": {
            "additionalProperties": false,
            "properties": {
                "day": {
                    "description": "Day id of the day",
                    "type": "string"
                },
                "shifts": {
                    "description": "The shifts this child attended on this day",
                    "items": {
                        "$ref": "#/definitions/IDetailedAttendance"
                    },
                    "type": "array"
                }
            },
            "required": [
                "day",
                "shifts"
            ],
            "type": "object"
        },
        "ILocalTime": {
            "additionalProperties": false,
            "properties": {
                "hour": {
                    "type": "integer"
                },
                "minute": {
                    "type": "integer"
                }
            },
            "required": [
                "hour",
                "minute"
            ],
            "type": "object"
        },
        "IPermission": {
            "additionalProperties": false,
            "properties": {
                "description": {
                    "type": "string"
                },
                "id": {
                    "type": "string"
                }
            },
            "required": [
                "description",
                "id"
            ],
            "type": "object"
        },
        "IPhoneContact": {
            "additionalProperties": false,
            "description": "Phone contact information for a person. Includes phone number and phone number meta-information.",
            "properties": {
                "comment": {
                    "type": "string"
                },
                "kind": {
                    "type": "string"
                },
                "phoneNumber": {
                    "type": "string"
                }
            },
            "required": [
                "phoneNumber"
            ],
            "type": "object"
        },
        "IPrice": {
            "additionalProperties": false,
            "properties": {
                "cents": {
                    "type": "integer"
                },
                "euro": {
                    "type": "integer"
                }
            },
            "required": [
                "cents",
                "euro"
            ],
            "type": "object"
        },
        "IRole": {
            "additionalProperties": false,
            "properties": {
                "description": {
                    "type": "string"
                },
                "id": {
                    "type": "string"
                },
                "impliedPermissions": {
                    "items": {
                        "$ref": "#/definitions/IPermission"
                    },
                    "type": "array"
                },
                "longerDescription": {
                    "type": "string"
                }
            },
            "required": [
                "description",
                "id",
                "impliedPermissions",
                "longerDescription"
            ],
            "type": "object"
        },
        "IShift": {
            "additionalProperties": false,
            "properties": {
                "childrenCanBePresent": {
                    "type": "boolean"
                },
                "crewCanBePresent": {
                    "type": "boolean"
                },
                "description": {
                    "type": "string"
                },
                "id": {
                    "type": "string"
                },
                "kind": {
                    "type": "string"
                },
                "location": {
                    "type": "string"
                },
                "price": {
                    "$ref": "#/definitions/IPrice"
                },
                "startAndEnd": {
                    "$ref": "#/definitions/IStartAndEndTime"
                }
            },
            "required": [
                "childrenCanBePresent",
                "crewCanBePresent",
                "id",
                "kind",
                "price"
            ],
            "type": "object"
        },
        "IStartAndEndTime": {
            "additionalProperties": false,
            "properties": {
                "end": {
                    "$ref": "#/definitions/ILocalTime"
                },
                "start": {
                    "$ref": "#/definitions/ILocalTime"
                }
            },
            "required": [
                "end",
                "start"
            ],
            "type": "object"
        },
        "LocalTime": {
            "additionalProperties": false,
            "properties": {
                "hour": {
                    "type": "number"
                },
                "minute": {
                    "type": "number"
                }
            },
            "required": [
                "hour",
                "minute"
            ],
            "type": "object"
        },
        "Permission": {
            "additionalProperties": false,
            "properties": {
                "description": {
                    "type": "string"
                },
                "id": {
                    "type": "string"
                }
            },
            "required": [
                "description",
                "id"
            ],
            "type": "object"
        },
        "Price": {
            "additionalProperties": false,
            "properties": {
                "cents": {
                    "type": "number"
                },
                "euro": {
                    "type": "number"
                }
            },
            "required": [
                "cents",
                "euro"
            ],
            "type": "object"
        },
        "Role": {
            "additionalProperties": false,
            "properties": {
                "description": {
                    "type": "string"
                },
                "id": {
                    "type": "string"
                },
                "impliedPermissions": {
                    "items": {
                        "$ref": "#/definitions/IPermission"
                    },
                    "type": "array"
                },
                "longerDescription": {
                    "type": "string"
                }
            },
            "required": [
                "description",
                "id",
                "impliedPermissions",
                "longerDescription"
            ],
            "type": "object"
        },
        "Shift": {
            "additionalProperties": false,
            "properties": {
                "childrenCanBePresent": {
                    "type": "boolean"
                },
                "crewCanBePresent": {
                    "type": "boolean"
                },
                "description": {
                    "type": "string"
                },
                "id": {
                    "type": "string"
                },
                "kind": {
                    "type": "string"
                },
                "location": {
                    "type": "string"
                },
                "price": {
                    "$ref": "#/definitions/Price"
                },
                "startAndEnd": {
                    "$ref": "#/definitions/StartAndEndTime"
                }
            },
            "required": [
                "childrenCanBePresent",
                "crewCanBePresent",
                "id",
                "kind",
                "price"
            ],
            "type": "object"
        },
        "StartAndEndTime": {
            "additionalProperties": false,
            "properties": {
                "end": {
                    "$ref": "#/definitions/LocalTime"
                },
                "start": {
                    "$ref": "#/definitions/LocalTime"
                }
            },
            "required": [
                "end",
                "start"
            ],
            "type": "object"
        }
    }
}
