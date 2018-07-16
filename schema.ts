export const schema = {
    "$schema": "http://json-schema.org/draft-06/schema#",
    "definitions": {
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
        "Day": {
            "additionalProperties": false,
            "properties": {
                "date": {
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
                "lastName": {
                    "type": "string"
                },
                "legacyAddress": {
                    "$ref": "#/definitions/IAddress"
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
        "ICrew": {
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
                    "description": "Day on which child was born as ISO 8601",
                    "type": "string"
                },
                "contact": {
                    "$ref": "#/definitions/IContactInfo"
                },
                "firstName": {
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
        "IRelativeTime": {
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
                    "$ref": "#/definitions/IRelativeTime"
                },
                "start": {
                    "$ref": "#/definitions/IRelativeTime"
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
