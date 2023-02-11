export const propsDefault = {
    "properties": {
        "name": "admin1",
        "data": {
            "schema": {
                "type": "object",
                "properties": {
                    "newInput1": {
                        "title": "Age",
                        "type": "integer",
                        "default": 0
                    },
                    "newInput2": {
                        "title": "First Name",
                        "type": "string",
                        "description": "Your First Name"
                    },
                    "newInput3": {
                        "title": "Given Name",
                        "type": "string",
                        "description": "Your Given Name"
                    }
                },
                "dependencies": {},
                "required": [
                    "newInput1",
                    "newInput2",
                    "newInput3"
                ]
            },
            "uischema": {
                "ui:order": [
                    "newInput1",
                    "newInput2",
                    "newInput3"
                ]
            },
            "id": "634b4470c2e881bd9a343e45",
            "title": "Paris Fashion Week",
            "description": "Some Description",
            "status": "ACCEPTING",
            "clients": {
                "634b4854c2e881bec01f8fe8": {
                    "name": "Sid",
                    "slideIds": [
                        "634b44f0c2e881bd9a343e48",
                        "634b4541c2e881bd9a343e4b",
                        "634b4586c2e881bd9a343e4e"
                    ],
                    "finalizedIds": [
                        "634b44f0c2e881bd9a343e48",
                        "634b4541c2e881bd9a343e4b",
                        "634b4586c2e881bd9a343e4e"
                    ],
                    "negotiationId": "634b4956c2e881bec01f8fea",
                    "preferenceSubmitted": true
                }
            },
            "slides": {
                "634b44f0c2e881bd9a343e48": {
                    "talentName": "Model One",
                    "formData": {
                        "newInput1": 18,
                        "newInput2": "Model",
                        "newInput3": "One"
                    },
                    "curated": true
                },
                "634b4541c2e881bd9a343e4b": {
                    "talentName": "Anushka Garg",
                    "formData": {
                        "newInput1": 25,
                        "newInput2": "Anushka",
                        "newInput3": "Garg"
                    },
                    "curated": true
                },
                "634b4586c2e881bd9a343e4e": {
                    "talentName": "Mounika",
                    "formData": {
                        "newInput1": 25,
                        "newInput2": "Mounika",
                        "newInput3": "Balivada"
                    },
                    "curated": true
                },
                "634b4ff6c2e881c05b22c390": {
                    "talentName": "Rohan",
                    "formData": {
                        "newInput1": 25,
                        "newInput2": "Rohan",
                        "newInput3": "Kandikoda"
                    },
                    "curated": false
                }
            }
        }
    }
}

export const PROPS_DELETED_EVENT = {
    "properties": {
        "name": "admin1",
        "data": {
            "schema": {
                "type": "object",
                "properties": {
                    "newInput1": {
                        "title": "Age",
                        "type": "integer",
                        "default": 0
                    },
                    "newInput2": {
                        "title": "First Name",
                        "type": "string",
                        "description": "Your First Name"
                    },
                    "newInput3": {
                        "title": "Given Name",
                        "type": "string",
                        "description": "Your Given Name"
                    }
                },
                "dependencies": {},
                "required": [
                    "newInput1",
                    "newInput2",
                    "newInput3"
                ]
            },
            "uischema": {
                "ui:order": [
                    "newInput1",
                    "newInput2",
                    "newInput3"
                ]
            },
            "id": "634b4470c2e881bd9a343e45",
            "title": "Paris Fashion Week",
            "description": "Some Description",
            "status": "DELETED",
            "clients": {
                "634b4854c2e881bec01f8fe8": {
                    "name": "Sid",
                    "slideIds": [
                        "634b44f0c2e881bd9a343e48",
                        "634b4541c2e881bd9a343e4b",
                        "634b4586c2e881bd9a343e4e"
                    ],
                    "finalizedIds": [
                        "634b44f0c2e881bd9a343e48",
                        "634b4541c2e881bd9a343e4b",
                        "634b4586c2e881bd9a343e4e"
                    ],
                    "negotiationId": "634b4956c2e881bec01f8fea",
                    "preferenceSubmitted": true
                }
            },
            "slides": {
                "634b44f0c2e881bd9a343e48": {
                    "talentName": "Model One",
                    "formData": {
                        "newInput1": 18,
                        "newInput2": "Model",
                        "newInput3": "One"
                    },
                    "curated": true
                },
                "634b4541c2e881bd9a343e4b": {
                    "talentName": "Anushka Garg",
                    "formData": {
                        "newInput1": 25,
                        "newInput2": "Anushka",
                        "newInput3": "Garg"
                    },
                    "curated": true
                },
                "634b4586c2e881bd9a343e4e": {
                    "talentName": "Mounika",
                    "formData": {
                        "newInput1": 25,
                        "newInput2": "Mounika",
                        "newInput3": "Balivada"
                    },
                    "curated": true
                },
                "634b4ff6c2e881c05b22c390": {
                    "talentName": "Rohan",
                    "formData": {
                        "newInput1": 25,
                        "newInput2": "Rohan",
                        "newInput3": "Kandikoda"
                    },
                    "curated": false
                }
            }
        }
    }
}

export const USER_PROPERTIES_WITH_SUBMISSIONS = {
    "name": "Model One",
    "acceptingTableData": [],
    "submittedTableData": [
        {
            "title": "Paris Fashion Week",
            "id": "634b4470c2e881bd9a343e45",
            "accepting": true,
            "status": "SUBMITTED"
        }
    ]
}

export const USER_PROPERTIES_WITH_ACCEPTING = {
    "name": "Model One",
    "acceptingTableData": [{
        "title": "Paris Fashion Week",
        "id": "634b4470c2e881bd9a343e45",
        "accepting": true,
        "status": "SOME_STATUS"
    }],
    "submittedTableData": []
}

export const ADMIN_PROPERTIES_EVENT_ACCEPTING = {
    "name": "admin1",
    "tableData": [
        {
            "id": "634b4470c2e881bd9a343e45",
            "title": "Paris Fashion Week",
            "status": "ACCEPTING"
        }
    ]
}

export const ADMIN_PROPERTIES_EVENT_NONE = {
    "name": "admin1",
    "tableData": []
}

export const ADMIN_PROPERTIES_EVENT_DELETED = {
    "name": "admin1",
    "tableData": [
        {
            "id": "634b4470c2e881bd9a343e45",
            "title": "Paris Fashion Week",
            "status": "DELETED"
        }
    ]
}

export const ROW_CURATED = {
    "talentName": "Rohan",
    "formData": {
        "newInput1": 25,
        "newInput2": "Rohan",
        "newInput3": "Kandikoda"
    },
    "curated": true,
    "id": "634b4ff6c2e881c05b22c390",
    "updated": false
}

export const ROWDATA_MOCKED = {
    "row": {
        "id": "634b44f0c2e881bd9a343e48",
        "name": "Model One",
        "curated": true,
        "formData": {
            "newInput1": 18,
            "newInput2": "Model",
            "newInput3": "One"
        },
        "uniqId": "634b44f0c2e881bd9a343e48",
        "talentName": "Model One"
    }
}

export const PROPERTIES_CLIENT_EMPTY = {
    "name": "momo",
    "tableData": []
}

export const PROPERTIES_CLIENT_NONEMPTY ={
    "name": "njknknj",
    "tableData": [
        {
            "title": "wewwq",
            "id": "6371983eed22d5ed037d39cd",
            "status": "ACCEPTING"
        }
    ]
}

export const PROPERTIES_CLIENT_SUMMARY ={
    "name": "njknknj",
    "data": {
        "schema": {
            "type": "object",
            "properties": {
                "plp": {
                    "title": "plp",
                    "type": "string"
                }
            },
            "dependencies": {},
            "required": []
        },
        "uischema": {
            "ui:order": [
                "plp"
            ]
        },
        "id": "6371983eed22d5ed037d39cd",
        "title": "wewwq",
        "description": "asasdsa",
        "status": "ACCEPTING",
        "negotiationId": "63719985ed22d5ed037d39d3",
        "finalizedIds": [],
        "slides": {
            "6371988eed22d5ed037d39d0": {
                "talentName": "efsedfsd",
                "formData": {
                    "plp": "nfjkdsnkjfds"
                }
            }
        }
    }
}

export const PROPERTIES_CLIENT_FEEDBACK = {
    "name": "Sid",
    "data": {
        "schema": {
            "type": "object",
            "properties": {
                "newInput1": {
                    "title": "Age",
                    "type": "integer",
                    "default": 0
                },
                "newInput2": {
                    "title": "First Name",
                    "type": "string",
                    "description": "Your First Name"
                },
                "newInput3": {
                    "title": "Given Name",
                    "type": "string",
                    "description": "Your Given Name"
                }
            },
            "dependencies": {},
            "required": [
                "newInput1",
                "newInput2",
                "newInput3"
            ]
        },
        "uischema": {
            "ui:order": [
                "newInput1",
                "newInput2",
                "newInput3"
            ]
        },
        "id": "634b4470c2e881bd9a343e45",
        "title": "Paris Fashion Week",
        "description": "Some Description",
        "status": "ACCEPTING",
        "negotiationId": "634b4956c2e881bec01f8fea",
        "finalizedIds": [],
        "location": null,
        "statename": null,
        "eventdate": null,
        "category": null,
        "is_paid_event": null,
        "slides": {
            "634b4541c2e881bd9a343e4b": {
                "talentName": "Anushka Garg",
                "formData": {
                    "newInput1": 25,
                    "newInput2": "Anushka",
                    "newInput3": "Garg"
                }
            },
            "634b4586c2e881bd9a343e4e": {
                "talentName": "Mounika",
                "formData": {
                    "newInput1": 25,
                    "newInput2": "Mounika",
                    "newInput3": "Balivada"
                }
            }
        }
    }
}

export const ADMIN_EVENT_PROPERTIES = {
    "name": "admin1",
    "data": {
        "schema": {
            "type": "object",
            "properties": {
                "newInput1": {
                    "title": "Age",
                    "type": "integer",
                    "default": 0
                },
                "newInput2": {
                    "title": "First Name",
                    "type": "string",
                    "description": "Your First Name"
                },
                "newInput3": {
                    "title": "Given Name",
                    "type": "string",
                    "description": "Your Given Name"
                }
            },
            "dependencies": {},
            "required": [
                "newInput1",
                "newInput2",
                "newInput3"
            ]
        },
        "uischema": {
            "ui:order": [
                "newInput1",
                "newInput2",
                "newInput3"
            ]
        },
        "id": "634b4470c2e881bd9a343e45",
        "title": "Paris Fashion Week",
        "description": "Some Description",
        "status": "ACCEPTING",
        "location": null,
        "statename": null,
        "eventdate": null,
        "category": null,
        "is_paid_event": null,
        "clients": {
            "634b4854c2e881bec01f8fe8": {
                "name": "Sid",
                "slideIds": [
                    "634b4541c2e881bd9a343e4b",
                    "634b4586c2e881bd9a343e4e"
                ],
                "finalizedIds": [],
                "negotiationId": "634b4956c2e881bec01f8fea",
                "preferenceSubmitted": true
            }
        },
        "slides": {
            "634b44f0c2e881bd9a343e48": {
                "talentName": "Model One",
                "formData": {
                    "newInput1": 18,
                    "newInput2": "Model",
                    "newInput3": "One"
                },
                "curated": true
            },
            "634b4541c2e881bd9a343e4b": {
                "talentName": "Anushka Garg",
                "formData": {
                    "newInput1": 25,
                    "newInput2": "Anushka",
                    "newInput3": "Garg"
                },
                "curated": true
            },
            "634b4586c2e881bd9a343e4e": {
                "talentName": "Mounika",
                "formData": {
                    "newInput1": 25,
                    "newInput2": "Mounika",
                    "newInput3": "Balivada"
                },
                "curated": true
            },
            "634b4ff6c2e881c05b22c390": {
                "talentName": "Rohan",
                "formData": {
                    "newInput1": 25,
                    "newInput2": "Rohan",
                    "newInput3": "Kandikoda"
                },
                "curated": false
            }
        }
    }
}