// https://api.guildwars2.com/v2/maps?ids=all

export interface IMap {
    map_name: string;
    min_level: number;
    max_level: number;
    default_floor: number;
    type: string;
    floors: number[];
    region_id?: number;
    region_name?: string;
    continent_id?: number;
    continent_name?: string;
    map_rect: any;
    continent_rect: any;
}
export interface IMaps {
    [id: string]: IMap;
}

export const maps: IMaps = {
    "15": {
        "min_level": 1,
        "max_level": 15,
        "default_floor": 1,
        "type": "Public",
        "floors": [
            1,
            65,
            3,
            2,
            0
        ],
        "region_id": 4,
        "region_name": "Kryta",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -43008,
                -27648
            ],
            [
                43008,
                30720
            ]
        ],
        "continent_rect": [
            [
                42624,
                28032
            ],
            [
                46208,
                30464
            ]
        ],
        "map_name": "Queensdale"
    },
    "17": {
        "min_level": 35,
        "max_level": 45,
        "default_floor": 1,
        "type": "Public",
        "floors": [
            1,
            65,
            3,
            2,
            0
        ],
        "region_id": 4,
        "region_name": "Kryta",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -36864,
                -33792
            ],
            [
                39936,
                33792
            ]
        ],
        "continent_rect": [
            [
                46208,
                25856
            ],
            [
                49408,
                28672
            ]
        ],
        "map_name": "Harathi Hinterlands"
    },
    "18": {
        "min_level": 0,
        "max_level": 80,
        "default_floor": 1,
        "type": "Public",
        "floors": [
            1,
            65,
            3,
            2,
            0
        ],
        "region_id": 4,
        "region_name": "Kryta",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -21504,
                -21504
            ],
            [
                24576,
                21504
            ]
        ],
        "continent_rect": [
            [
                43008,
                26240
            ],
            [
                44928,
                28032
            ]
        ],
        "map_name": "Divinity's Reach"
    },
    "19": {
        "min_level": 1,
        "max_level": 15,
        "default_floor": 1,
        "type": "Public",
        "floors": [
            1,
            3,
            2,
            0
        ],
        "region_id": 2,
        "region_name": "Ascalon",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -49152,
                -24576
            ],
            [
                49152,
                24576
            ]
        ],
        "continent_rect": [
            [
                57856,
                29952
            ],
            [
                61952,
                32000
            ]
        ],
        "map_name": "Plains of Ashford"
    },
    "20": {
        "min_level": 40,
        "max_level": 50,
        "default_floor": 1,
        "type": "Public",
        "floors": [
            1,
            3,
            2,
            0
        ],
        "region_id": 2,
        "region_name": "Ascalon",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -24576,
                -49152
            ],
            [
                24576,
                49152
            ]
        ],
        "continent_rect": [
            [
                61952,
                28544
            ],
            [
                64000,
                32640
            ]
        ],
        "map_name": "Blazeridge Steppes"
    },
    "21": {
        "min_level": 30,
        "max_level": 40,
        "default_floor": 1,
        "type": "Public",
        "floors": [
            1,
            3,
            2,
            0
        ],
        "region_id": 2,
        "region_name": "Ascalon",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -36864,
                -36864
            ],
            [
                36864,
                36864
            ]
        ],
        "continent_rect": [
            [
                61440,
                32640
            ],
            [
                64512,
                35712
            ]
        ],
        "map_name": "Fields of Ruin"
    },
    "22": {
        "min_level": 60,
        "max_level": 70,
        "default_floor": 1,
        "type": "Public",
        "floors": [
            1,
            3,
            2,
            0
        ],
        "region_id": 2,
        "region_name": "Ascalon",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -39936,
                -33792
            ],
            [
                39936,
                33792
            ]
        ],
        "continent_rect": [
            [
                56576,
                24832
            ],
            [
                59904,
                27648
            ]
        ],
        "map_name": "Fireheart Rise"
    },
    "23": {
        "min_level": 15,
        "max_level": 25,
        "default_floor": 1,
        "type": "Public",
        "floors": [
            1,
            57,
            3,
            2,
            0
        ],
        "region_id": 4,
        "region_name": "Kryta",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -49152,
                -24576
            ],
            [
                49152,
                24576
            ]
        ],
        "continent_rect": [
            [
                42112,
                30464
            ],
            [
                46208,
                32512
            ]
        ],
        "map_name": "Kessex Hills"
    },
    "24": {
        "min_level": 25,
        "max_level": 35,
        "default_floor": 1,
        "type": "Public",
        "floors": [
            1,
            3,
            2,
            0
        ],
        "region_id": 4,
        "region_name": "Kryta",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -49152,
                -24576
            ],
            [
                52224,
                24576
            ]
        ],
        "continent_rect": [
            [
                46208,
                28672
            ],
            [
                50432,
                30720
            ]
        ],
        "map_name": "Gendarran Fields"
    },
    "25": {
        "min_level": 50,
        "max_level": 60,
        "default_floor": 1,
        "type": "Public",
        "floors": [
            1,
            67,
            3,
            2,
            0
        ],
        "region_id": 2,
        "region_name": "Ascalon",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -24576,
                -49152
            ],
            [
                24576,
                49152
            ]
        ],
        "continent_rect": [
            [
                59904,
                25856
            ],
            [
                61952,
                29952
            ]
        ],
        "map_name": "Iron Marches"
    },
    "26": {
        "min_level": 40,
        "max_level": 50,
        "default_floor": 1,
        "type": "Public",
        "floors": [
            1,
            3,
            2,
            0
        ],
        "region_id": 1,
        "region_name": "Shiverpeak Mountains",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -27648,
                -36864
            ],
            [
                27648,
                39936
            ]
        ],
        "continent_rect": [
            [
                52224,
                31360
            ],
            [
                54528,
                34560
            ]
        ],
        "map_name": "Dredgehaunt Cliffs"
    },
    "27": {
        "min_level": 25,
        "max_level": 40,
        "default_floor": 1,
        "type": "Public",
        "floors": [
            1,
            3,
            2,
            0
        ],
        "region_id": 1,
        "region_name": "Shiverpeak Mountains",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -21504,
                -58368
            ],
            [
                21504,
                58368
            ]
        ],
        "continent_rect": [
            [
                50432,
                29696
            ],
            [
                52224,
                34560
            ]
        ],
        "map_name": "Lornar's Pass"
    },
    "28": {
        "min_level": 1,
        "max_level": 15,
        "default_floor": 1,
        "type": "Public",
        "floors": [
            1,
            3,
            58,
            2,
            0
        ],
        "region_id": 1,
        "region_name": "Shiverpeak Mountains",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -21504,
                -55296
            ],
            [
                21504,
                55296
            ]
        ],
        "continent_rect": [
            [
                54528,
                27648
            ],
            [
                56320,
                32256
            ]
        ],
        "map_name": "Wayfarer Foothills"
    },
    "29": {
        "min_level": 50,
        "max_level": 60,
        "default_floor": 1,
        "type": "Public",
        "floors": [
            1,
            3,
            2,
            0
        ],
        "region_id": 1,
        "region_name": "Shiverpeak Mountains",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -27648,
                -36864
            ],
            [
                27648,
                39936
            ]
        ],
        "continent_rect": [
            [
                51712,
                34560
            ],
            [
                54016,
                37760
            ]
        ],
        "map_name": "Timberline Falls"
    },
    "30": {
        "min_level": 70,
        "max_level": 80,
        "default_floor": 1,
        "type": "Public",
        "floors": [
            1,
            3,
            2,
            0
        ],
        "region_id": 1,
        "region_name": "Shiverpeak Mountains",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -36864,
                -36864
            ],
            [
                36864,
                36864
            ]
        ],
        "continent_rect": [
            [
                53504,
                24576
            ],
            [
                56576,
                27648
            ]
        ],
        "map_name": "Frostgorge Sound"
    },
    "31": {
        "min_level": 15,
        "max_level": 25,
        "default_floor": 1,
        "type": "Public",
        "floors": [
            1,
            3,
            2,
            0
        ],
        "region_id": 1,
        "region_name": "Shiverpeak Mountains",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -49152,
                -24576
            ],
            [
                49152,
                24576
            ]
        ],
        "continent_rect": [
            [
                50432,
                27648
            ],
            [
                54528,
                29696
            ]
        ],
        "map_name": "Snowden Drifts"
    },
    "32": {
        "min_level": 15,
        "max_level": 25,
        "default_floor": 1,
        "type": "Public",
        "floors": [
            1,
            3,
            2,
            0
        ],
        "region_id": 2,
        "region_name": "Ascalon",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -43008,
                -27648
            ],
            [
                43008,
                27648
            ]
        ],
        "continent_rect": [
            [
                56320,
                27648
            ],
            [
                59904,
                29952
            ]
        ],
        "map_name": "Diessa Plateau"
    },
    "33": {
        "min_level": 30,
        "max_level": 32,
        "default_floor": -2,
        "type": "Instance",
        "floors": [
            -2
        ],
        "region_id": 2,
        "region_name": "Ascalon",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -15360,
                -12288
            ],
            [
                15360,
                12288
            ]
        ],
        "continent_rect": [
            [
                60416,
                29440
            ],
            [
                61696,
                30464
            ]
        ],
        "map_name": "Ascalonian Catacombs"
    },
    "34": {
        "min_level": 1,
        "max_level": 15,
        "default_floor": 1,
        "type": "Public",
        "floors": [
            1,
            3,
            2,
            0
        ],
        "region_id": 5,
        "region_name": "Tarnished Coast",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -21504,
                -46080
            ],
            [
                24576,
                49152
            ]
        ],
        "continent_rect": [
            [
                42112,
                32512
            ],
            [
                44032,
                36480
            ]
        ],
        "map_name": "Caledon Forest"
    },
    "35": {
        "min_level": 1,
        "max_level": 15,
        "default_floor": 1,
        "type": "Public",
        "floors": [
            1,
            56,
            3,
            2,
            0
        ],
        "region_id": 5,
        "region_name": "Tarnished Coast",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -24576,
                -39936
            ],
            [
                27648,
                39936
            ]
        ],
        "continent_rect": [
            [
                39936,
                33536
            ],
            [
                42112,
                36864
            ]
        ],
        "map_name": "Metrica Province"
    },
    "36": {
        "min_level": 35,
        "max_level": 35,
        "default_floor": -2,
        "type": "Instance",
        "floors": [
            -2
        ],
        "region_id": 2,
        "region_name": "Ascalon",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -15360,
                -12288
            ],
            [
                15360,
                12288
            ]
        ],
        "continent_rect": [
            [
                60416,
                29440
            ],
            [
                61696,
                30464
            ]
        ],
        "map_name": "Ascalonian Catacombs"
    },
    "37": {
        "min_level": 10,
        "max_level": 10,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1,
            2
        ],
        "region_id": 4,
        "region_name": "Kryta",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -21504,
                -21504
            ],
            [
                24576,
                21504
            ]
        ],
        "continent_rect": [
            [
                43008,
                26240
            ],
            [
                44928,
                28032
            ]
        ],
        "map_name": "Arson at the Orphanage"
    },
    "38": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 3,
        "type": "Center",
        "floors": [
            1,
            3
        ],
        "region_id": 7,
        "region_name": "World vs. World",
        "continent_id": 2,
        "continent_name": "Mists",
        "map_rect": [
            [
                -36864,
                -36864
            ],
            [
                36864,
                36864
            ]
        ],
        "continent_rect": [
            [
                8958,
                12798
            ],
            [
                12030,
                15870
            ]
        ],
        "map_name": "Eternal Battlegrounds"
    },
    "39": {
        "min_level": 60,
        "max_level": 70,
        "default_floor": 1,
        "type": "Public",
        "floors": [
            1,
            3,
            2,
            0
        ],
        "region_id": 5,
        "region_name": "Tarnished Coast",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -46080,
                -27648
            ],
            [
                46080,
                30720
            ]
        ],
        "continent_rect": [
            [
                50560,
                37760
            ],
            [
                54400,
                40192
            ]
        ],
        "map_name": "Mount Maelstrom"
    },
    "50": {
        "min_level": 0,
        "max_level": 80,
        "default_floor": 1,
        "type": "Public",
        "floors": [
            1,
            2,
            0,
            64,
            3,
            66
        ],
        "region_id": 4,
        "region_name": "Kryta",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -27648,
                -18432
            ],
            [
                30720,
                18432
            ]
        ],
        "continent_rect": [
            [
                48000,
                30720
            ],
            [
                50432,
                32256
            ]
        ],
        "map_name": "Lion's Arch"
    },
    "51": {
        "min_level": 70,
        "max_level": 75,
        "default_floor": 1,
        "type": "Public",
        "floors": [
            1,
            3,
            2,
            0
        ],
        "region_id": 3,
        "region_name": "Ruins of Orr",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -39936,
                -33792
            ],
            [
                39936,
                33792
            ]
        ],
        "continent_rect": [
            [
                47232,
                38784
            ],
            [
                50560,
                41600
            ]
        ],
        "map_name": "Straits of Devastation"
    },
    "53": {
        "min_level": 55,
        "max_level": 65,
        "default_floor": 1,
        "type": "Public",
        "floors": [
            1,
            3,
            2,
            0
        ],
        "region_id": 5,
        "region_name": "Tarnished Coast",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -30720,
                -39936
            ],
            [
                30720,
                39936
            ]
        ],
        "continent_rect": [
            [
                48000,
                35456
            ],
            [
                50560,
                38784
            ]
        ],
        "map_name": "Sparkfly Fen"
    },
    "54": {
        "min_level": 15,
        "max_level": 25,
        "default_floor": 1,
        "type": "Public",
        "floors": [
            1,
            56,
            3,
            2,
            0
        ],
        "region_id": 5,
        "region_name": "Tarnished Coast",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -39936,
                -30720
            ],
            [
                43008,
                33792
            ]
        ],
        "continent_rect": [
            [
                38656,
                30848
            ],
            [
                42112,
                33536
            ]
        ],
        "map_name": "Brisban Wildlands"
    },
    "55": {
        "min_level": 10,
        "max_level": 10,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1,
            2
        ],
        "region_id": 4,
        "region_name": "Kryta",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -21504,
                -21504
            ],
            [
                24576,
                21504
            ]
        ],
        "continent_rect": [
            [
                43008,
                26240
            ],
            [
                44928,
                28032
            ]
        ],
        "map_name": "The Hospital in Jeopardy"
    },
    "61": {
        "min_level": 10,
        "max_level": 10,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 4,
        "region_name": "Kryta",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -43008,
                -27648
            ],
            [
                43008,
                30720
            ]
        ],
        "continent_rect": [
            [
                42624,
                28032
            ],
            [
                46208,
                30464
            ]
        ],
        "map_name": "Infiltration"
    },
    "62": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Public",
        "floors": [
            1,
            3,
            2,
            0
        ],
        "region_id": 3,
        "region_name": "Ruins of Orr",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -24576,
                -49152
            ],
            [
                24576,
                49152
            ]
        ],
        "continent_rect": [
            [
                42880,
                41600
            ],
            [
                44928,
                45696
            ]
        ],
        "map_name": "Cursed Shore"
    },
    "63": {
        "min_level": 60,
        "max_level": 62,
        "default_floor": -7,
        "type": "Instance",
        "floors": [
            -7
        ],
        "region_id": 1,
        "region_name": "Shiverpeak Mountains",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -18432,
                -18432
            ],
            [
                18432,
                18432
            ]
        ],
        "continent_rect": [
            [
                52096,
                33792
            ],
            [
                53632,
                35328
            ]
        ],
        "map_name": "Sorrow's Embrace"
    },
    "64": {
        "min_level": 65,
        "max_level": 65,
        "default_floor": -7,
        "type": "Instance",
        "floors": [
            -7
        ],
        "region_id": 1,
        "region_name": "Shiverpeak Mountains",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -18432,
                -18432
            ],
            [
                18432,
                18432
            ]
        ],
        "continent_rect": [
            [
                52096,
                33792
            ],
            [
                53632,
                35328
            ]
        ],
        "map_name": "Sorrow's Embrace"
    },
    "65": {
        "min_level": 75,
        "max_level": 80,
        "default_floor": 1,
        "type": "Public",
        "floors": [
            1,
            3,
            2,
            0
        ],
        "region_id": 3,
        "region_name": "Ruins of Orr",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -49152,
                -24576
            ],
            [
                49152,
                24576
            ]
        ],
        "continent_rect": [
            [
                43136,
                39552
            ],
            [
                47232,
                41600
            ]
        ],
        "map_name": "Malchor's Leap"
    },
    "66": {
        "min_level": 70,
        "max_level": 72,
        "default_floor": -10,
        "type": "Instance",
        "floors": [
            -10
        ],
        "region_id": 2,
        "region_name": "Ascalon",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -15360,
                -15360
            ],
            [
                15360,
                15360
            ]
        ],
        "continent_rect": [
            [
                59392,
                24064
            ],
            [
                60672,
                25344
            ]
        ],
        "map_name": "Citadel of Flame"
    },
    "67": {
        "min_level": 55,
        "max_level": 80,
        "default_floor": -9,
        "type": "Instance",
        "floors": [
            -5,
            -9
        ],
        "region_id": 5,
        "region_name": "Tarnished Coast",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -15360,
                -12288
            ],
            [
                15360,
                12288
            ]
        ],
        "continent_rect": [
            [
                41472,
                32384
            ],
            [
                42752,
                33408
            ]
        ],
        "map_name": "Twilight Arbor"
    },
    "68": {
        "min_level": 50,
        "max_level": 52,
        "default_floor": -6,
        "type": "Instance",
        "floors": [
            -6
        ],
        "region_id": 5,
        "region_name": "Tarnished Coast",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -15360,
                -12288
            ],
            [
                15360,
                12288
            ]
        ],
        "continent_rect": [
            [
                41472,
                32384
            ],
            [
                42752,
                33408
            ]
        ],
        "map_name": "Twilight Arbor"
    },
    "69": {
        "min_level": 75,
        "max_level": 75,
        "default_floor": -10,
        "type": "Instance",
        "floors": [
            -10
        ],
        "region_id": 2,
        "region_name": "Ascalon",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -15360,
                -15360
            ],
            [
                15360,
                15360
            ]
        ],
        "continent_rect": [
            [
                59392,
                24064
            ],
            [
                60672,
                25344
            ]
        ],
        "map_name": "Citadel of Flame"
    },
    "70": {
        "min_level": 76,
        "max_level": 78,
        "default_floor": 8,
        "type": "Instance",
        "floors": [
            7,
            6,
            8
        ],
        "region_id": 1,
        "region_name": "Shiverpeak Mountains",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -15360,
                -12288
            ],
            [
                15360,
                15360
            ]
        ],
        "continent_rect": [
            [
                54528,
                24448
            ],
            [
                55808,
                25600
            ]
        ],
        "map_name": "Honor of the Waves"
    },
    "71": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 8,
        "type": "Instance",
        "floors": [
            7,
            6,
            8
        ],
        "region_id": 1,
        "region_name": "Shiverpeak Mountains",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -15360,
                -12288
            ],
            [
                15360,
                15360
            ]
        ],
        "continent_rect": [
            [
                54528,
                24448
            ],
            [
                55808,
                25600
            ]
        ],
        "map_name": "Honor of the Waves"
    },
    "73": {
        "min_level": 45,
        "max_level": 55,
        "default_floor": 1,
        "type": "Public",
        "floors": [
            1,
            3,
            2,
            0
        ],
        "region_id": 4,
        "region_name": "Kryta",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -27648,
                -36864
            ],
            [
                30720,
                39936
            ]
        ],
        "continent_rect": [
            [
                48000,
                32256
            ],
            [
                50432,
                35456
            ]
        ],
        "map_name": "Bloodtide Coast"
    },
    "75": {
        "min_level": 40,
        "max_level": 42,
        "default_floor": 4,
        "type": "Instance",
        "floors": [
            5,
            -4,
            4
        ],
        "region_id": 4,
        "region_name": "Kryta",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -12288,
                -12288
            ],
            [
                12288,
                12288
            ]
        ],
        "continent_rect": [
            [
                45184,
                27776
            ],
            [
                46208,
                28800
            ]
        ],
        "map_name": "Caudecus's Manor"
    },
    "76": {
        "min_level": 45,
        "max_level": 45,
        "default_floor": 4,
        "type": "Instance",
        "floors": [
            5,
            -4,
            4
        ],
        "region_id": 4,
        "region_name": "Kryta",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -12288,
                -12288
            ],
            [
                12288,
                12288
            ]
        ],
        "continent_rect": [
            [
                45184,
                27776
            ],
            [
                46208,
                28800
            ]
        ],
        "map_name": "Caudecus's Manor"
    },
    "77": {
        "min_level": 10,
        "max_level": 10,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1,
            2
        ],
        "region_id": 4,
        "region_name": "Kryta",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -21504,
                -21504
            ],
            [
                24576,
                21504
            ]
        ],
        "continent_rect": [
            [
                43008,
                26240
            ],
            [
                44928,
                28032
            ]
        ],
        "map_name": "Search the Premises"
    },
    "79": {
        "min_level": 10,
        "max_level": 10,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1,
            2
        ],
        "region_id": 4,
        "region_name": "Kryta",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -21504,
                -21504
            ],
            [
                24576,
                21504
            ]
        ],
        "continent_rect": [
            [
                43008,
                26240
            ],
            [
                44928,
                28032
            ]
        ],
        "map_name": "The Informant"
    },
    "80": {
        "min_level": 10,
        "max_level": 10,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1,
            2
        ],
        "region_id": 4,
        "region_name": "Kryta",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -21504,
                -21504
            ],
            [
                24576,
                21504
            ]
        ],
        "continent_rect": [
            [
                43008,
                26240
            ],
            [
                44928,
                28032
            ]
        ],
        "map_name": "A Society Function"
    },
    "81": {
        "min_level": 78,
        "max_level": 80,
        "default_floor": -11,
        "type": "Instance",
        "floors": [
            -11
        ],
        "region_id": 5,
        "region_name": "Tarnished Coast",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -12288,
                -15360
            ],
            [
                12288,
                15360
            ]
        ],
        "continent_rect": [
            [
                53184,
                37696
            ],
            [
                54208,
                38976
            ]
        ],
        "map_name": "Crucible of Eternity"
    },
    "82": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": -11,
        "type": "Instance",
        "floors": [
            -11
        ],
        "region_id": 5,
        "region_name": "Tarnished Coast",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -12288,
                -15360
            ],
            [
                12288,
                15360
            ]
        ],
        "continent_rect": [
            [
                53184,
                37696
            ],
            [
                54208,
                38976
            ]
        ],
        "map_name": "Crucible of Eternity"
    },
    "89": {
        "min_level": 10,
        "max_level": 10,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 4,
        "region_name": "Kryta",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -43008,
                -27648
            ],
            [
                43008,
                30720
            ]
        ],
        "continent_rect": [
            [
                42624,
                28032
            ],
            [
                46208,
                30464
            ]
        ],
        "map_name": "Chasing the Culprits"
    },
    "91": {
        "min_level": 0,
        "max_level": 80,
        "default_floor": 1,
        "type": "Public",
        "floors": [
            1,
            3,
            2,
            0
        ],
        "region_id": 5,
        "region_name": "Tarnished Coast",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -15360,
                -24576
            ],
            [
                18432,
                24576
            ]
        ],
        "continent_rect": [
            [
                42496,
                36480
            ],
            [
                43904,
                38528
            ]
        ],
        "map_name": "The Grove"
    },
    "92": {
        "min_level": 10,
        "max_level": 10,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1,
            2
        ],
        "region_id": 4,
        "region_name": "Kryta",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -21504,
                -21504
            ],
            [
                24576,
                21504
            ]
        ],
        "continent_rect": [
            [
                43008,
                26240
            ],
            [
                44928,
                28032
            ]
        ],
        "map_name": "The Trial of Julius Zamon"
    },
    "95": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 3,
        "type": "GreenHome",
        "floors": [
            1,
            3
        ],
        "region_id": 7,
        "region_name": "World vs. World",
        "continent_id": 2,
        "continent_name": "Mists",
        "map_rect": [
            [
                -30720,
                -43008
            ],
            [
                30720,
                43008
            ]
        ],
        "continent_rect": [
            [
                5630,
                11518
            ],
            [
                8190,
                15102
            ]
        ],
        "map_name": " Alpine Borderlands"
    },
    "96": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 3,
        "type": "BlueHome",
        "floors": [
            1,
            3
        ],
        "region_id": 7,
        "region_name": "World vs. World",
        "continent_id": 2,
        "continent_name": "Mists",
        "map_rect": [
            [
                -30720,
                -43008
            ],
            [
                30720,
                43008
            ]
        ],
        "continent_rect": [
            [
                12798,
                10878
            ],
            [
                15358,
                14462
            ]
        ],
        "map_name": " Alpine Borderlands"
    },
    "97": {
        "min_level": 10,
        "max_level": 10,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1,
            2
        ],
        "region_id": 4,
        "region_name": "Kryta",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -21504,
                -21504
            ],
            [
                24576,
                21504
            ]
        ],
        "continent_rect": [
            [
                43008,
                26240
            ],
            [
                44928,
                28032
            ]
        ],
        "map_name": "Infiltration"
    },
    "110": {
        "min_level": 10,
        "max_level": 10,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1,
            2
        ],
        "region_id": 4,
        "region_name": "Kryta",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -21504,
                -21504
            ],
            [
                24576,
                21504
            ]
        ],
        "continent_rect": [
            [
                43008,
                26240
            ],
            [
                44928,
                28032
            ]
        ],
        "map_name": "The Perils of Friendship"
    },
    "111": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 10,
        "type": "Instance",
        "floors": [
            11,
            10
        ],
        "region_id": 3,
        "region_name": "Ruins of Orr",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -39936,
                -33792
            ],
            [
                39936,
                33792
            ]
        ],
        "continent_rect": [
            [
                44928,
                43520
            ],
            [
                48256,
                46336
            ]
        ],
        "map_name": "Victory or Death"
    },
    "112": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 9,
        "type": "Instance",
        "floors": [
            9
        ],
        "region_id": 3,
        "region_name": "Ruins of Orr",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -24576,
                -24576
            ],
            [
                24576,
                24576
            ]
        ],
        "continent_rect": [
            [
                44928,
                42880
            ],
            [
                46976,
                44928
            ]
        ],
        "map_name": "The Ruined City of Arah"
    },
    "113": {
        "min_level": 10,
        "max_level": 10,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 4,
        "region_name": "Kryta",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -43008,
                -27648
            ],
            [
                43008,
                30720
            ]
        ],
        "continent_rect": [
            [
                42624,
                28032
            ],
            [
                46208,
                30464
            ]
        ],
        "map_name": "Desperate Medicine"
    },
    "120": {
        "min_level": 10,
        "max_level": 10,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1,
            2
        ],
        "region_id": 4,
        "region_name": "Kryta",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -21504,
                -21504
            ],
            [
                24576,
                21504
            ]
        ],
        "continent_rect": [
            [
                43008,
                26240
            ],
            [
                44928,
                28032
            ]
        ],
        "map_name": "The Commander"
    },
    "138": {
        "min_level": 1,
        "max_level": 1,
        "default_floor": 1,
        "type": "Tutorial",
        "floors": [
            1
        ],
        "region_id": 4,
        "region_name": "Kryta",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -43008,
                -27648
            ],
            [
                43008,
                30720
            ]
        ],
        "continent_rect": [
            [
                42624,
                28032
            ],
            [
                46208,
                30464
            ]
        ],
        "map_name": "Defense of Shaemoor"
    },
    "139": {
        "min_level": 0,
        "max_level": 80,
        "default_floor": 1,
        "type": "Public",
        "floors": [
            1,
            3,
            55,
            2,
            0
        ],
        "region_id": 5,
        "region_name": "Tarnished Coast",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -30720,
                -30720
            ],
            [
                30720,
                30720
            ]
        ],
        "continent_rect": [
            [
                37376,
                36094
            ],
            [
                39936,
                38654
            ]
        ],
        "map_name": "Rata Sum"
    },
    "140": {
        "min_level": 10,
        "max_level": 10,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 4,
        "region_name": "Kryta",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -43008,
                -27648
            ],
            [
                43008,
                30720
            ]
        ],
        "continent_rect": [
            [
                42624,
                28032
            ],
            [
                46208,
                30464
            ]
        ],
        "map_name": "The Apothecary"
    },
    "142": {
        "min_level": 10,
        "max_level": 10,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 4,
        "region_name": "Kryta",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -43008,
                -27648
            ],
            [
                43008,
                30720
            ]
        ],
        "continent_rect": [
            [
                42624,
                28032
            ],
            [
                46208,
                30464
            ]
        ],
        "map_name": "Going Undercover"
    },
    "143": {
        "min_level": 10,
        "max_level": 10,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1,
            2
        ],
        "region_id": 4,
        "region_name": "Kryta",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -21504,
                -21504
            ],
            [
                24576,
                21504
            ]
        ],
        "continent_rect": [
            [
                43008,
                26240
            ],
            [
                44928,
                28032
            ]
        ],
        "map_name": "Going Undercover"
    },
    "144": {
        "min_level": 10,
        "max_level": 10,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1,
            2
        ],
        "region_id": 4,
        "region_name": "Kryta",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -21504,
                -21504
            ],
            [
                24576,
                21504
            ]
        ],
        "continent_rect": [
            [
                43008,
                26240
            ],
            [
                44928,
                28032
            ]
        ],
        "map_name": "The Greater Good"
    },
    "145": {
        "min_level": 10,
        "max_level": 10,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 4,
        "region_name": "Kryta",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -43008,
                -27648
            ],
            [
                43008,
                30720
            ]
        ],
        "continent_rect": [
            [
                42624,
                28032
            ],
            [
                46208,
                30464
            ]
        ],
        "map_name": "The Rescue"
    },
    "147": {
        "min_level": 10,
        "max_level": 10,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1,
            2
        ],
        "region_id": 4,
        "region_name": "Kryta",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -21504,
                -21504
            ],
            [
                24576,
                21504
            ]
        ],
        "continent_rect": [
            [
                43008,
                26240
            ],
            [
                44928,
                28032
            ]
        ],
        "map_name": "Breaking the Blade"
    },
    "148": {
        "min_level": 20,
        "max_level": 20,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1,
            2
        ],
        "region_id": 4,
        "region_name": "Kryta",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -21504,
                -21504
            ],
            [
                24576,
                21504
            ]
        ],
        "continent_rect": [
            [
                43008,
                26240
            ],
            [
                44928,
                28032
            ]
        ],
        "map_name": "The Fall of Falcon Company"
    },
    "149": {
        "min_level": 20,
        "max_level": 20,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 4,
        "region_name": "Kryta",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -43008,
                -27648
            ],
            [
                43008,
                30720
            ]
        ],
        "continent_rect": [
            [
                42624,
                28032
            ],
            [
                46208,
                30464
            ]
        ],
        "map_name": "The Fall of Falcon Company"
    },
    "152": {
        "min_level": 20,
        "max_level": 20,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 4,
        "region_name": "Kryta",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -43008,
                -27648
            ],
            [
                43008,
                30720
            ]
        ],
        "continent_rect": [
            [
                42624,
                28032
            ],
            [
                46208,
                30464
            ]
        ],
        "map_name": "Confronting Captain Tervelan"
    },
    "153": {
        "min_level": 20,
        "max_level": 20,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1,
            2
        ],
        "region_id": 4,
        "region_name": "Kryta",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -21504,
                -21504
            ],
            [
                24576,
                21504
            ]
        ],
        "continent_rect": [
            [
                43008,
                26240
            ],
            [
                44928,
                28032
            ]
        ],
        "map_name": "Seek Logan's Aid"
    },
    "154": {
        "min_level": 20,
        "max_level": 20,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 4,
        "region_name": "Kryta",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -43008,
                -27648
            ],
            [
                43008,
                30720
            ]
        ],
        "continent_rect": [
            [
                42624,
                28032
            ],
            [
                46208,
                30464
            ]
        ],
        "map_name": "Seek Logan's Aid"
    },
    "157": {
        "min_level": 20,
        "max_level": 20,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1,
            2
        ],
        "region_id": 4,
        "region_name": "Kryta",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -21504,
                -21504
            ],
            [
                24576,
                21504
            ]
        ],
        "continent_rect": [
            [
                43008,
                26240
            ],
            [
                44928,
                28032
            ]
        ],
        "map_name": "Accusation"
    },
    "159": {
        "min_level": 20,
        "max_level": 20,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 4,
        "region_name": "Kryta",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -49152,
                -24576
            ],
            [
                49152,
                24576
            ]
        ],
        "continent_rect": [
            [
                42112,
                30464
            ],
            [
                46208,
                32512
            ]
        ],
        "map_name": "Accusation"
    },
    "161": {
        "min_level": 20,
        "max_level": 20,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 4,
        "region_name": "Kryta",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -49152,
                -24576
            ],
            [
                49152,
                24576
            ]
        ],
        "continent_rect": [
            [
                42112,
                30464
            ],
            [
                46208,
                32512
            ]
        ],
        "map_name": "Liberation"
    },
    "162": {
        "min_level": 20,
        "max_level": 20,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1,
            2
        ],
        "region_id": 4,
        "region_name": "Kryta",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -21504,
                -21504
            ],
            [
                24576,
                21504
            ]
        ],
        "continent_rect": [
            [
                43008,
                26240
            ],
            [
                44928,
                28032
            ]
        ],
        "map_name": "Voices From the Past"
    },
    "163": {
        "min_level": 20,
        "max_level": 20,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1,
            2
        ],
        "region_id": 4,
        "region_name": "Kryta",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -21504,
                -21504
            ],
            [
                24576,
                21504
            ]
        ],
        "continent_rect": [
            [
                43008,
                26240
            ],
            [
                44928,
                28032
            ]
        ],
        "map_name": "Voices From the Past"
    },
    "171": {
        "min_level": 20,
        "max_level": 20,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 4,
        "region_name": "Kryta",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -43008,
                -27648
            ],
            [
                43008,
                30720
            ]
        ],
        "continent_rect": [
            [
                42624,
                28032
            ],
            [
                46208,
                30464
            ]
        ],
        "map_name": "Rending the Mantle"
    },
    "172": {
        "min_level": 20,
        "max_level": 20,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1,
            2
        ],
        "region_id": 4,
        "region_name": "Kryta",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -21504,
                -21504
            ],
            [
                24576,
                21504
            ]
        ],
        "continent_rect": [
            [
                43008,
                26240
            ],
            [
                44928,
                28032
            ]
        ],
        "map_name": "Rending the Mantle"
    },
    "178": {
        "min_level": 20,
        "max_level": 20,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1,
            2
        ],
        "region_id": 4,
        "region_name": "Kryta",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -21504,
                -21504
            ],
            [
                24576,
                21504
            ]
        ],
        "continent_rect": [
            [
                43008,
                26240
            ],
            [
                44928,
                28032
            ]
        ],
        "map_name": "The Floating Grizwhirl"
    },
    "179": {
        "min_level": 20,
        "max_level": 20,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1,
            2
        ],
        "region_id": 4,
        "region_name": "Kryta",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -21504,
                -21504
            ],
            [
                24576,
                21504
            ]
        ],
        "continent_rect": [
            [
                43008,
                26240
            ],
            [
                44928,
                28032
            ]
        ],
        "map_name": "The Floating Grizwhirl"
    },
    "180": {
        "min_level": 20,
        "max_level": 20,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1,
            2
        ],
        "region_id": 4,
        "region_name": "Kryta",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -21504,
                -21504
            ],
            [
                24576,
                21504
            ]
        ],
        "continent_rect": [
            [
                43008,
                26240
            ],
            [
                44928,
                28032
            ]
        ],
        "map_name": "The Floating Grizwhirl"
    },
    "182": {
        "min_level": 20,
        "max_level": 20,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 4,
        "region_name": "Kryta",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -43008,
                -27648
            ],
            [
                43008,
                30720
            ]
        ],
        "continent_rect": [
            [
                42624,
                28032
            ],
            [
                46208,
                30464
            ]
        ],
        "map_name": "Clown College"
    },
    "184": {
        "min_level": 20,
        "max_level": 20,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 4,
        "region_name": "Kryta",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -49152,
                -24576
            ],
            [
                49152,
                24576
            ]
        ],
        "continent_rect": [
            [
                42112,
                30464
            ],
            [
                46208,
                32512
            ]
        ],
        "map_name": "The Artist's Workshop"
    },
    "185": {
        "min_level": 20,
        "max_level": 20,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 4,
        "region_name": "Kryta",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -49152,
                -24576
            ],
            [
                49152,
                24576
            ]
        ],
        "continent_rect": [
            [
                42112,
                30464
            ],
            [
                46208,
                32512
            ]
        ],
        "map_name": "Into the Woods"
    },
    "186": {
        "min_level": 20,
        "max_level": 20,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1,
            2
        ],
        "region_id": 4,
        "region_name": "Kryta",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -21504,
                -21504
            ],
            [
                24576,
                21504
            ]
        ],
        "continent_rect": [
            [
                43008,
                26240
            ],
            [
                44928,
                28032
            ]
        ],
        "map_name": "The Ringmaster"
    },
    "190": {
        "min_level": 30,
        "max_level": 30,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1,
            2
        ],
        "region_id": 4,
        "region_name": "Kryta",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -21504,
                -21504
            ],
            [
                24576,
                21504
            ]
        ],
        "continent_rect": [
            [
                43008,
                26240
            ],
            [
                44928,
                28032
            ]
        ],
        "map_name": "The Orders of Tyria"
    },
    "191": {
        "min_level": 30,
        "max_level": 30,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 4,
        "region_name": "Kryta",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -49152,
                -24576
            ],
            [
                49152,
                24576
            ]
        ],
        "continent_rect": [
            [
                42112,
                30464
            ],
            [
                46208,
                32512
            ]
        ],
        "map_name": "The Orders of Tyria"
    },
    "192": {
        "min_level": 30,
        "max_level": 30,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 4,
        "region_name": "Kryta",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -49152,
                -24576
            ],
            [
                49152,
                24576
            ]
        ],
        "continent_rect": [
            [
                42112,
                30464
            ],
            [
                46208,
                32512
            ]
        ],
        "map_name": "Brute Force"
    },
    "193": {
        "min_level": 30,
        "max_level": 30,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 4,
        "region_name": "Kryta",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -49152,
                -24576
            ],
            [
                49152,
                24576
            ]
        ],
        "continent_rect": [
            [
                42112,
                30464
            ],
            [
                46208,
                32512
            ]
        ],
        "map_name": "Mortus Virge"
    },
    "195": {
        "min_level": 30,
        "max_level": 30,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 4,
        "region_name": "Kryta",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -49152,
                -24576
            ],
            [
                49152,
                24576
            ]
        ],
        "continent_rect": [
            [
                42112,
                30464
            ],
            [
                46208,
                32512
            ]
        ],
        "map_name": "Triskell Quay"
    },
    "196": {
        "min_level": 30,
        "max_level": 30,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 4,
        "region_name": "Kryta",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -49152,
                -24576
            ],
            [
                49152,
                24576
            ]
        ],
        "continent_rect": [
            [
                42112,
                30464
            ],
            [
                46208,
                32512
            ]
        ],
        "map_name": "Track the Seraph"
    },
    "198": {
        "min_level": 30,
        "max_level": 30,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 4,
        "region_name": "Kryta",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -49152,
                -24576
            ],
            [
                52224,
                24576
            ]
        ],
        "continent_rect": [
            [
                46208,
                28672
            ],
            [
                50432,
                30720
            ]
        ],
        "map_name": "Speaker of the Dead"
    },
    "199": {
        "min_level": 30,
        "max_level": 30,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 4,
        "region_name": "Kryta",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -49152,
                -24576
            ],
            [
                52224,
                24576
            ]
        ],
        "continent_rect": [
            [
                46208,
                28672
            ],
            [
                50432,
                30720
            ]
        ],
        "map_name": "The Sad Tale of the \"Ravenous\""
    },
    "201": {
        "min_level": 30,
        "max_level": 30,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1,
            2
        ],
        "region_id": 4,
        "region_name": "Kryta",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -21504,
                -21504
            ],
            [
                24576,
                21504
            ]
        ],
        "continent_rect": [
            [
                43008,
                26240
            ],
            [
                44928,
                28032
            ]
        ],
        "map_name": "Kellach's Attack"
    },
    "202": {
        "min_level": 30,
        "max_level": 30,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1,
            2
        ],
        "region_id": 4,
        "region_name": "Kryta",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -21504,
                -21504
            ],
            [
                24576,
                21504
            ]
        ],
        "continent_rect": [
            [
                43008,
                26240
            ],
            [
                44928,
                28032
            ]
        ],
        "map_name": "The Queen's Justice"
    },
    "203": {
        "min_level": 30,
        "max_level": 30,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1,
            2
        ],
        "region_id": 4,
        "region_name": "Kryta",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -21504,
                -21504
            ],
            [
                24576,
                21504
            ]
        ],
        "continent_rect": [
            [
                43008,
                26240
            ],
            [
                44928,
                28032
            ]
        ],
        "map_name": "The Trap"
    },
    "211": {
        "min_level": 10,
        "max_level": 10,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 2,
        "region_name": "Ascalon",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -18432,
                -24576
            ],
            [
                18432,
                24576
            ]
        ],
        "continent_rect": [
            [
                56320,
                29952
            ],
            [
                57856,
                32000
            ]
        ],
        "map_name": "Best Laid Plans"
    },
    "212": {
        "min_level": 10,
        "max_level": 10,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1,
            2
        ],
        "region_id": 4,
        "region_name": "Kryta",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -21504,
                -21504
            ],
            [
                24576,
                21504
            ]
        ],
        "continent_rect": [
            [
                43008,
                26240
            ],
            [
                44928,
                28032
            ]
        ],
        "map_name": "Welcome Home"
    },
    "215": {
        "min_level": 10,
        "max_level": 10,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 2,
        "region_name": "Ascalon",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -18432,
                -24576
            ],
            [
                18432,
                24576
            ]
        ],
        "continent_rect": [
            [
                56320,
                29952
            ],
            [
                57856,
                32000
            ]
        ],
        "map_name": "The Tribune's Call"
    },
    "216": {
        "min_level": 10,
        "max_level": 10,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 2,
        "region_name": "Ascalon",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -18432,
                -24576
            ],
            [
                18432,
                24576
            ]
        ],
        "continent_rect": [
            [
                56320,
                29952
            ],
            [
                57856,
                32000
            ]
        ],
        "map_name": "The Tribune's Call"
    },
    "217": {
        "min_level": 10,
        "max_level": 10,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 2,
        "region_name": "Ascalon",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -18432,
                -24576
            ],
            [
                18432,
                24576
            ]
        ],
        "continent_rect": [
            [
                56320,
                29952
            ],
            [
                57856,
                32000
            ]
        ],
        "map_name": "The Tribune's Call"
    },
    "218": {
        "min_level": 0,
        "max_level": 80,
        "default_floor": 1,
        "type": "Public",
        "floors": [
            1,
            3,
            2,
            0
        ],
        "region_id": 2,
        "region_name": "Ascalon",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -18432,
                -24576
            ],
            [
                18432,
                24576
            ]
        ],
        "continent_rect": [
            [
                56320,
                29952
            ],
            [
                57856,
                32000
            ]
        ],
        "map_name": "Black Citadel"
    },
    "222": {
        "min_level": 10,
        "max_level": 10,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 2,
        "region_name": "Ascalon",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -18432,
                -24576
            ],
            [
                18432,
                24576
            ]
        ],
        "continent_rect": [
            [
                56320,
                29952
            ],
            [
                57856,
                32000
            ]
        ],
        "map_name": "A Spy for a Spy"
    },
    "224": {
        "min_level": 10,
        "max_level": 10,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 2,
        "region_name": "Ascalon",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -49152,
                -24576
            ],
            [
                49152,
                24576
            ]
        ],
        "continent_rect": [
            [
                57856,
                29952
            ],
            [
                61952,
                32000
            ]
        ],
        "map_name": "Scrapyard Dogs"
    },
    "225": {
        "min_level": 10,
        "max_level": 10,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 2,
        "region_name": "Ascalon",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -49152,
                -24576
            ],
            [
                49152,
                24576
            ]
        ],
        "continent_rect": [
            [
                57856,
                29952
            ],
            [
                61952,
                32000
            ]
        ],
        "map_name": "A Spy for a Spy"
    },
    "226": {
        "min_level": 10,
        "max_level": 10,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1,
            2
        ],
        "region_id": 4,
        "region_name": "Kryta",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -21504,
                -21504
            ],
            [
                24576,
                21504
            ]
        ],
        "continent_rect": [
            [
                43008,
                26240
            ],
            [
                44928,
                28032
            ]
        ],
        "map_name": "On the Mend"
    },
    "232": {
        "min_level": 10,
        "max_level": 10,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 2,
        "region_name": "Ascalon",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -49152,
                -24576
            ],
            [
                49152,
                24576
            ]
        ],
        "continent_rect": [
            [
                57856,
                29952
            ],
            [
                61952,
                32000
            ]
        ],
        "map_name": "Spilled Blood"
    },
    "234": {
        "min_level": 10,
        "max_level": 10,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 2,
        "region_name": "Ascalon",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -49152,
                -24576
            ],
            [
                49152,
                24576
            ]
        ],
        "continent_rect": [
            [
                57856,
                29952
            ],
            [
                61952,
                32000
            ]
        ],
        "map_name": "Ghostbore Musket"
    },
    "237": {
        "min_level": 10,
        "max_level": 10,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 2,
        "region_name": "Ascalon",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -49152,
                -24576
            ],
            [
                49152,
                24576
            ]
        ],
        "continent_rect": [
            [
                57856,
                29952
            ],
            [
                61952,
                32000
            ]
        ],
        "map_name": "Iron Grip of the Legion"
    },
    "238": {
        "min_level": 10,
        "max_level": 10,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 2,
        "region_name": "Ascalon",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -18432,
                -24576
            ],
            [
                18432,
                24576
            ]
        ],
        "continent_rect": [
            [
                56320,
                29952
            ],
            [
                57856,
                32000
            ]
        ],
        "map_name": "The Flame Advances"
    },
    "239": {
        "min_level": 10,
        "max_level": 10,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 2,
        "region_name": "Ascalon",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -18432,
                -24576
            ],
            [
                18432,
                24576
            ]
        ],
        "continent_rect": [
            [
                56320,
                29952
            ],
            [
                57856,
                32000
            ]
        ],
        "map_name": "The Flame Advances"
    },
    "242": {
        "min_level": 10,
        "max_level": 10,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 2,
        "region_name": "Ascalon",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -49152,
                -24576
            ],
            [
                49152,
                24576
            ]
        ],
        "continent_rect": [
            [
                57856,
                29952
            ],
            [
                61952,
                32000
            ]
        ],
        "map_name": "Test Your Metal"
    },
    "244": {
        "min_level": 10,
        "max_level": 10,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 2,
        "region_name": "Ascalon",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -49152,
                -24576
            ],
            [
                49152,
                24576
            ]
        ],
        "continent_rect": [
            [
                57856,
                29952
            ],
            [
                61952,
                32000
            ]
        ],
        "map_name": "Quick and Quiet"
    },
    "248": {
        "min_level": 0,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1,
            3,
            2,
            0
        ],
        "region_id": 4,
        "region_name": "Kryta",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -21504,
                -21504
            ],
            [
                24576,
                21504
            ]
        ],
        "continent_rect": [
            [
                43008,
                26240
            ],
            [
                44928,
                28032
            ]
        ],
        "map_name": "Salma District (Home)"
    },
    "249": {
        "min_level": 20,
        "max_level": 20,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 2,
        "region_name": "Ascalon",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -18432,
                -24576
            ],
            [
                18432,
                24576
            ]
        ],
        "continent_rect": [
            [
                56320,
                29952
            ],
            [
                57856,
                32000
            ]
        ],
        "map_name": "An Unusual Inheritance"
    },
    "250": {
        "min_level": 20,
        "max_level": 20,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 2,
        "region_name": "Ascalon",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -49152,
                -24576
            ],
            [
                49152,
                24576
            ]
        ],
        "continent_rect": [
            [
                57856,
                29952
            ],
            [
                61952,
                32000
            ]
        ],
        "map_name": "Windrock Maze"
    },
    "251": {
        "min_level": 20,
        "max_level": 20,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 2,
        "region_name": "Ascalon",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -18432,
                -24576
            ],
            [
                18432,
                24576
            ]
        ],
        "continent_rect": [
            [
                56320,
                29952
            ],
            [
                57856,
                32000
            ]
        ],
        "map_name": "Mired Deep"
    },
    "252": {
        "min_level": 20,
        "max_level": 20,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 2,
        "region_name": "Ascalon",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -49152,
                -24576
            ],
            [
                49152,
                24576
            ]
        ],
        "continent_rect": [
            [
                57856,
                29952
            ],
            [
                61952,
                32000
            ]
        ],
        "map_name": "Mired Deep"
    },
    "254": {
        "min_level": 10,
        "max_level": 10,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 2,
        "region_name": "Ascalon",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -49152,
                -24576
            ],
            [
                49152,
                24576
            ]
        ],
        "continent_rect": [
            [
                57856,
                29952
            ],
            [
                61952,
                32000
            ]
        ],
        "map_name": "Deadly Force"
    },
    "255": {
        "min_level": 10,
        "max_level": 10,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 2,
        "region_name": "Ascalon",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -49152,
                -24576
            ],
            [
                49152,
                24576
            ]
        ],
        "continent_rect": [
            [
                57856,
                29952
            ],
            [
                61952,
                32000
            ]
        ],
        "map_name": "Ghostbore Artillery"
    },
    "256": {
        "min_level": 20,
        "max_level": 20,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 2,
        "region_name": "Ascalon",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -43008,
                -27648
            ],
            [
                43008,
                27648
            ]
        ],
        "continent_rect": [
            [
                56320,
                27648
            ],
            [
                59904,
                29952
            ]
        ],
        "map_name": "No Negotiations"
    },
    "257": {
        "min_level": 20,
        "max_level": 20,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 2,
        "region_name": "Ascalon",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -43008,
                -27648
            ],
            [
                43008,
                27648
            ]
        ],
        "continent_rect": [
            [
                56320,
                27648
            ],
            [
                59904,
                29952
            ]
        ],
        "map_name": "Salvaging Scrap"
    },
    "258": {
        "min_level": 20,
        "max_level": 20,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 2,
        "region_name": "Ascalon",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -43008,
                -27648
            ],
            [
                43008,
                27648
            ]
        ],
        "continent_rect": [
            [
                56320,
                27648
            ],
            [
                59904,
                29952
            ]
        ],
        "map_name": "Salvaging Scrap"
    },
    "259": {
        "min_level": 20,
        "max_level": 20,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 2,
        "region_name": "Ascalon",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -18432,
                -24576
            ],
            [
                18432,
                24576
            ]
        ],
        "continent_rect": [
            [
                56320,
                29952
            ],
            [
                57856,
                32000
            ]
        ],
        "map_name": "In the Ruins"
    },
    "260": {
        "min_level": 20,
        "max_level": 20,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 2,
        "region_name": "Ascalon",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -43008,
                -27648
            ],
            [
                43008,
                27648
            ]
        ],
        "continent_rect": [
            [
                56320,
                27648
            ],
            [
                59904,
                29952
            ]
        ],
        "map_name": "In the Ruins"
    },
    "262": {
        "min_level": 10,
        "max_level": 10,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 2,
        "region_name": "Ascalon",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -18432,
                -24576
            ],
            [
                18432,
                24576
            ]
        ],
        "continent_rect": [
            [
                56320,
                29952
            ],
            [
                57856,
                32000
            ]
        ],
        "map_name": "Chain of Command"
    },
    "263": {
        "min_level": 10,
        "max_level": 10,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 2,
        "region_name": "Ascalon",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -49152,
                -24576
            ],
            [
                49152,
                24576
            ]
        ],
        "continent_rect": [
            [
                57856,
                29952
            ],
            [
                61952,
                32000
            ]
        ],
        "map_name": "Chain of Command"
    },
    "264": {
        "min_level": 10,
        "max_level": 10,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 2,
        "region_name": "Ascalon",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -18432,
                -24576
            ],
            [
                18432,
                24576
            ]
        ],
        "continent_rect": [
            [
                56320,
                29952
            ],
            [
                57856,
                32000
            ]
        ],
        "map_name": "Time for a Promotion"
    },
    "267": {
        "min_level": 10,
        "max_level": 10,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 2,
        "region_name": "Ascalon",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -49152,
                -24576
            ],
            [
                49152,
                24576
            ]
        ],
        "continent_rect": [
            [
                57856,
                29952
            ],
            [
                61952,
                32000
            ]
        ],
        "map_name": "The End of the Line"
    },
    "269": {
        "min_level": 10,
        "max_level": 10,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 2,
        "region_name": "Ascalon",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -49152,
                -24576
            ],
            [
                49152,
                24576
            ]
        ],
        "continent_rect": [
            [
                57856,
                29952
            ],
            [
                61952,
                32000
            ]
        ],
        "map_name": "Magic Users"
    },
    "271": {
        "min_level": 10,
        "max_level": 10,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 2,
        "region_name": "Ascalon",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -18432,
                -24576
            ],
            [
                18432,
                24576
            ]
        ],
        "continent_rect": [
            [
                56320,
                29952
            ],
            [
                57856,
                32000
            ]
        ],
        "map_name": "Rage Suppression"
    },
    "272": {
        "min_level": 10,
        "max_level": 10,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 2,
        "region_name": "Ascalon",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -49152,
                -24576
            ],
            [
                49152,
                24576
            ]
        ],
        "continent_rect": [
            [
                57856,
                29952
            ],
            [
                61952,
                32000
            ]
        ],
        "map_name": "Rage Suppression"
    },
    "274": {
        "min_level": 10,
        "max_level": 10,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 2,
        "region_name": "Ascalon",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -49152,
                -24576
            ],
            [
                49152,
                24576
            ]
        ],
        "continent_rect": [
            [
                57856,
                29952
            ],
            [
                61952,
                32000
            ]
        ],
        "map_name": "Operation: Bulwark"
    },
    "275": {
        "min_level": 20,
        "max_level": 20,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 2,
        "region_name": "Ascalon",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -18432,
                -24576
            ],
            [
                18432,
                24576
            ]
        ],
        "continent_rect": [
            [
                56320,
                29952
            ],
            [
                57856,
                32000
            ]
        ],
        "map_name": "AWOL"
    },
    "276": {
        "min_level": 20,
        "max_level": 20,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 2,
        "region_name": "Ascalon",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -49152,
                -24576
            ],
            [
                49152,
                24576
            ]
        ],
        "continent_rect": [
            [
                57856,
                29952
            ],
            [
                61952,
                32000
            ]
        ],
        "map_name": "Human's Lament"
    },
    "282": {
        "min_level": 20,
        "max_level": 20,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 2,
        "region_name": "Ascalon",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -43008,
                -27648
            ],
            [
                43008,
                27648
            ]
        ],
        "continent_rect": [
            [
                56320,
                27648
            ],
            [
                59904,
                29952
            ]
        ],
        "map_name": "Misplaced Faith"
    },
    "283": {
        "min_level": 20,
        "max_level": 20,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 2,
        "region_name": "Ascalon",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -18432,
                -24576
            ],
            [
                18432,
                24576
            ]
        ],
        "continent_rect": [
            [
                56320,
                29952
            ],
            [
                57856,
                32000
            ]
        ],
        "map_name": "Thicker Than Water"
    },
    "284": {
        "min_level": 20,
        "max_level": 20,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 2,
        "region_name": "Ascalon",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -18432,
                -24576
            ],
            [
                18432,
                24576
            ]
        ],
        "continent_rect": [
            [
                56320,
                29952
            ],
            [
                57856,
                32000
            ]
        ],
        "map_name": "Dishonorable Discharge"
    },
    "287": {
        "min_level": 20,
        "max_level": 20,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 2,
        "region_name": "Ascalon",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -18432,
                -24576
            ],
            [
                18432,
                24576
            ]
        ],
        "continent_rect": [
            [
                56320,
                29952
            ],
            [
                57856,
                32000
            ]
        ],
        "map_name": "Searching for the Truth"
    },
    "288": {
        "min_level": 20,
        "max_level": 20,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 2,
        "region_name": "Ascalon",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -18432,
                -24576
            ],
            [
                18432,
                24576
            ]
        ],
        "continent_rect": [
            [
                56320,
                29952
            ],
            [
                57856,
                32000
            ]
        ],
        "map_name": "Lighting the Beacons"
    },
    "290": {
        "min_level": 20,
        "max_level": 20,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 2,
        "region_name": "Ascalon",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -49152,
                -24576
            ],
            [
                49152,
                24576
            ]
        ],
        "continent_rect": [
            [
                57856,
                29952
            ],
            [
                61952,
                32000
            ]
        ],
        "map_name": "Stoking the Flame"
    },
    "294": {
        "min_level": 20,
        "max_level": 20,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 2,
        "region_name": "Ascalon",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -43008,
                -27648
            ],
            [
                43008,
                27648
            ]
        ],
        "continent_rect": [
            [
                56320,
                27648
            ],
            [
                59904,
                29952
            ]
        ],
        "map_name": "A Fork in the Road"
    },
    "295": {
        "min_level": 20,
        "max_level": 20,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 2,
        "region_name": "Ascalon",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -18432,
                -24576
            ],
            [
                18432,
                24576
            ]
        ],
        "continent_rect": [
            [
                56320,
                29952
            ],
            [
                57856,
                32000
            ]
        ],
        "map_name": "Sins of the Father"
    },
    "297": {
        "min_level": 30,
        "max_level": 30,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 2,
        "region_name": "Ascalon",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -18432,
                -24576
            ],
            [
                18432,
                24576
            ]
        ],
        "continent_rect": [
            [
                56320,
                29952
            ],
            [
                57856,
                32000
            ]
        ],
        "map_name": "Graveyard Ornaments"
    },
    "326": {
        "min_level": 0,
        "max_level": 80,
        "default_floor": 1,
        "type": "Public",
        "floors": [
            1,
            3,
            58,
            2,
            0
        ],
        "region_id": 1,
        "region_name": "Shiverpeak Mountains",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -27648,
                -18432
            ],
            [
                27648,
                21504
            ]
        ],
        "continent_rect": [
            [
                52224,
                29696
            ],
            [
                54528,
                31360
            ]
        ],
        "map_name": "Hoelbrak"
    },
    "327": {
        "min_level": 10,
        "max_level": 10,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1,
            2
        ],
        "region_id": 4,
        "region_name": "Kryta",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -21504,
                -21504
            ],
            [
                24576,
                21504
            ]
        ],
        "continent_rect": [
            [
                43008,
                26240
            ],
            [
                44928,
                28032
            ]
        ],
        "map_name": "Desperate Medicine"
    },
    "330": {
        "min_level": 0,
        "max_level": 15,
        "default_floor": 2,
        "type": "Instance",
        "floors": [
            1,
            3,
            2,
            0
        ],
        "region_id": 4,
        "region_name": "Kryta",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -21504,
                -21504
            ],
            [
                24576,
                21504
            ]
        ],
        "continent_rect": [
            [
                43008,
                26240
            ],
            [
                44928,
                28032
            ]
        ],
        "map_name": "Seraph Headquarters"
    },
    "334": {
        "min_level": 0,
        "max_level": 0,
        "default_floor": 1,
        "type": "Pvp",
        "floors": [
            1,
            3,
            2,
            0
        ],
        "region_id": 1,
        "region_name": "Shiverpeak Mountains",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -27648,
                -18432
            ],
            [
                27648,
                21504
            ]
        ],
        "continent_rect": [
            [
                52224,
                29696
            ],
            [
                54528,
                31360
            ]
        ],
        "map_name": "Keg Brawl"
    },
    "335": {
        "min_level": 60,
        "max_level": 60,
        "default_floor": 1,
        "type": "Public",
        "floors": [
            1,
            3,
            2,
            0
        ],
        "region_id": 4,
        "region_name": "Kryta",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -18432,
                -18432
            ],
            [
                18432,
                18432
            ]
        ],
        "continent_rect": [
            [
                46720,
                32256
            ],
            [
                48256,
                33792
            ]
        ],
        "map_name": "Claw Island"
    },
    "336": {
        "min_level": 45,
        "max_level": 55,
        "default_floor": -3,
        "type": "Instance",
        "floors": [
            -3,
            1
        ],
        "region_id": 4,
        "region_name": "Kryta",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -12288,
                -12288
            ],
            [
                12288,
                12288
            ]
        ],
        "continent_rect": [
            [
                48768,
                32384
            ],
            [
                49792,
                33408
            ]
        ],
        "map_name": "Chantry of Secrets"
    },
    "350": {
        "min_level": 0,
        "max_level": 80,
        "default_floor": 1,
        "type": "Public",
        "floors": [
            1
        ],
        "region_id": 6,
        "region_name": "Player vs. Player",
        "continent_id": 2,
        "continent_name": "Mists",
        "map_rect": [
            [
                -15360,
                -15360
            ],
            [
                15360,
                15360
            ]
        ],
        "continent_rect": [
            [
                4865,
                6398
            ],
            [
                6145,
                7678
            ]
        ],
        "map_name": "Heart of the Mists"
    },
    "363": {
        "min_level": 20,
        "max_level": 20,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 4,
        "region_name": "Kryta",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -49152,
                -24576
            ],
            [
                49152,
                24576
            ]
        ],
        "continent_rect": [
            [
                42112,
                30464
            ],
            [
                46208,
                32512
            ]
        ],
        "map_name": "The Sting"
    },
    "364": {
        "min_level": 20,
        "max_level": 20,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 4,
        "region_name": "Kryta",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -49152,
                -24576
            ],
            [
                49152,
                24576
            ]
        ],
        "continent_rect": [
            [
                42112,
                30464
            ],
            [
                46208,
                32512
            ]
        ],
        "map_name": "Drawing Out the Cult"
    },
    "365": {
        "min_level": 20,
        "max_level": 20,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 4,
        "region_name": "Kryta",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -49152,
                -24576
            ],
            [
                49152,
                24576
            ]
        ],
        "continent_rect": [
            [
                42112,
                30464
            ],
            [
                46208,
                32512
            ]
        ],
        "map_name": "Ashes of the Past"
    },
    "371": {
        "min_level": 0,
        "max_level": 0,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1,
            3,
            2,
            0
        ],
        "region_id": 2,
        "region_name": "Ascalon",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -18432,
                -24576
            ],
            [
                18432,
                24576
            ]
        ],
        "continent_rect": [
            [
                56320,
                29952
            ],
            [
                57856,
                32000
            ]
        ],
        "map_name": "Hero's Canton (Home)"
    },
    "372": {
        "min_level": 0,
        "max_level": 0,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1,
            3,
            2,
            0
        ],
        "region_id": 2,
        "region_name": "Ascalon",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -18432,
                -24576
            ],
            [
                18432,
                24576
            ]
        ],
        "continent_rect": [
            [
                56320,
                29952
            ],
            [
                57856,
                32000
            ]
        ],
        "map_name": "Blood Tribune Quarters"
    },
    "373": {
        "min_level": 0,
        "max_level": 0,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1,
            3,
            2,
            0
        ],
        "region_id": 2,
        "region_name": "Ascalon",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -18432,
                -24576
            ],
            [
                18432,
                24576
            ]
        ],
        "continent_rect": [
            [
                56320,
                29952
            ],
            [
                57856,
                32000
            ]
        ],
        "map_name": "The Command Core"
    },
    "374": {
        "min_level": 0,
        "max_level": 0,
        "default_floor": 2,
        "type": "Instance",
        "floors": [
            1,
            3,
            2,
            0
        ],
        "region_id": 1,
        "region_name": "Shiverpeak Mountains",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -27648,
                -18432
            ],
            [
                27648,
                21504
            ]
        ],
        "continent_rect": [
            [
                52224,
                29696
            ],
            [
                54528,
                31360
            ]
        ],
        "map_name": "Knut Whitebear's Loft"
    },
    "375": {
        "min_level": 0,
        "max_level": 0,
        "default_floor": 2,
        "type": "Instance",
        "floors": [
            1,
            3,
            2,
            0
        ],
        "region_id": 1,
        "region_name": "Shiverpeak Mountains",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -27648,
                -18432
            ],
            [
                27648,
                21504
            ]
        ],
        "continent_rect": [
            [
                52224,
                29696
            ],
            [
                54528,
                31360
            ]
        ],
        "map_name": "Hunter's Hearth (Home)"
    },
    "376": {
        "min_level": 0,
        "max_level": 0,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1,
            3,
            2,
            0
        ],
        "region_id": 1,
        "region_name": "Shiverpeak Mountains",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -27648,
                -18432
            ],
            [
                27648,
                21504
            ]
        ],
        "continent_rect": [
            [
                52224,
                29696
            ],
            [
                54528,
                31360
            ]
        ],
        "map_name": "Stonewright's Steading"
    },
    "378": {
        "min_level": 0,
        "max_level": 15,
        "default_floor": 2,
        "type": "Instance",
        "floors": [
            1,
            3,
            2,
            0
        ],
        "region_id": 4,
        "region_name": "Kryta",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -21504,
                -21504
            ],
            [
                24576,
                21504
            ]
        ],
        "continent_rect": [
            [
                43008,
                26240
            ],
            [
                44928,
                28032
            ]
        ],
        "map_name": "Queen's Throne Room"
    },
    "379": {
        "min_level": 1,
        "max_level": 1,
        "default_floor": 1,
        "type": "Tutorial",
        "floors": [
            1
        ],
        "region_id": 1,
        "region_name": "Shiverpeak Mountains",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -21504,
                -55296
            ],
            [
                21504,
                55296
            ]
        ],
        "continent_rect": [
            [
                54528,
                27648
            ],
            [
                56320,
                32256
            ]
        ],
        "map_name": "The Great Hunt"
    },
    "380": {
        "min_level": 10,
        "max_level": 10,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 1,
        "region_name": "Shiverpeak Mountains",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -21504,
                -55296
            ],
            [
                21504,
                55296
            ]
        ],
        "continent_rect": [
            [
                54528,
                27648
            ],
            [
                56320,
                32256
            ]
        ],
        "map_name": "A Weapon of Legend"
    },
    "381": {
        "min_level": 10,
        "max_level": 10,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 1,
        "region_name": "Shiverpeak Mountains",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -21504,
                -55296
            ],
            [
                21504,
                55296
            ]
        ],
        "continent_rect": [
            [
                54528,
                27648
            ],
            [
                56320,
                32256
            ]
        ],
        "map_name": "The Last of the Giant-Kings"
    },
    "382": {
        "min_level": 10,
        "max_level": 10,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 1,
        "region_name": "Shiverpeak Mountains",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -21504,
                -55296
            ],
            [
                21504,
                55296
            ]
        ],
        "continent_rect": [
            [
                54528,
                27648
            ],
            [
                56320,
                32256
            ]
        ],
        "map_name": "Disciples of the Dragon"
    },
    "385": {
        "min_level": 10,
        "max_level": 10,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1,
            2
        ],
        "region_id": 1,
        "region_name": "Shiverpeak Mountains",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -27648,
                -18432
            ],
            [
                27648,
                21504
            ]
        ],
        "continent_rect": [
            [
                52224,
                29696
            ],
            [
                54528,
                31360
            ]
        ],
        "map_name": "A Weapon of Legend"
    },
    "386": {
        "min_level": 10,
        "max_level": 10,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 1,
        "region_name": "Shiverpeak Mountains",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -21504,
                -55296
            ],
            [
                21504,
                55296
            ]
        ],
        "continent_rect": [
            [
                54528,
                27648
            ],
            [
                56320,
                32256
            ]
        ],
        "map_name": "Echoes of Ages Past"
    },
    "387": {
        "min_level": 10,
        "max_level": 10,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 1,
        "region_name": "Shiverpeak Mountains",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -21504,
                -55296
            ],
            [
                21504,
                55296
            ]
        ],
        "continent_rect": [
            [
                54528,
                27648
            ],
            [
                56320,
                32256
            ]
        ],
        "map_name": "Wild Spirits"
    },
    "388": {
        "min_level": 10,
        "max_level": 10,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 1,
        "region_name": "Shiverpeak Mountains",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -21504,
                -55296
            ],
            [
                21504,
                55296
            ]
        ],
        "continent_rect": [
            [
                54528,
                27648
            ],
            [
                56320,
                32256
            ]
        ],
        "map_name": "Out of the Skies"
    },
    "389": {
        "min_level": 10,
        "max_level": 10,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1,
            2
        ],
        "region_id": 1,
        "region_name": "Shiverpeak Mountains",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -27648,
                -18432
            ],
            [
                27648,
                21504
            ]
        ],
        "continent_rect": [
            [
                52224,
                29696
            ],
            [
                54528,
                31360
            ]
        ],
        "map_name": "Echoes of Ages Past"
    },
    "390": {
        "min_level": 10,
        "max_level": 10,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1,
            2
        ],
        "region_id": 1,
        "region_name": "Shiverpeak Mountains",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -27648,
                -18432
            ],
            [
                27648,
                21504
            ]
        ],
        "continent_rect": [
            [
                52224,
                29696
            ],
            [
                54528,
                31360
            ]
        ],
        "map_name": "Twilight of the Wolf"
    },
    "391": {
        "min_level": 10,
        "max_level": 10,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 1,
        "region_name": "Shiverpeak Mountains",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -21504,
                -55296
            ],
            [
                21504,
                55296
            ]
        ],
        "continent_rect": [
            [
                54528,
                27648
            ],
            [
                56320,
                32256
            ]
        ],
        "map_name": "Rage of the Minotaurs"
    },
    "392": {
        "min_level": 10,
        "max_level": 10,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1,
            2
        ],
        "region_id": 1,
        "region_name": "Shiverpeak Mountains",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -27648,
                -18432
            ],
            [
                27648,
                21504
            ]
        ],
        "continent_rect": [
            [
                52224,
                29696
            ],
            [
                54528,
                31360
            ]
        ],
        "map_name": "A Pup's Illness"
    },
    "393": {
        "min_level": 10,
        "max_level": 10,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 1,
        "region_name": "Shiverpeak Mountains",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -21504,
                -55296
            ],
            [
                21504,
                55296
            ]
        ],
        "continent_rect": [
            [
                54528,
                27648
            ],
            [
                56320,
                32256
            ]
        ],
        "map_name": "Through the Veil"
    },
    "394": {
        "min_level": 10,
        "max_level": 10,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 1,
        "region_name": "Shiverpeak Mountains",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -21504,
                -55296
            ],
            [
                21504,
                55296
            ]
        ],
        "continent_rect": [
            [
                54528,
                27648
            ],
            [
                56320,
                32256
            ]
        ],
        "map_name": "A Trap Foiled"
    },
    "396": {
        "min_level": 10,
        "max_level": 10,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 1,
        "region_name": "Shiverpeak Mountains",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -21504,
                -55296
            ],
            [
                21504,
                55296
            ]
        ],
        "continent_rect": [
            [
                54528,
                27648
            ],
            [
                56320,
                32256
            ]
        ],
        "map_name": "Raven's Revered"
    },
    "397": {
        "min_level": 10,
        "max_level": 10,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 1,
        "region_name": "Shiverpeak Mountains",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -21504,
                -55296
            ],
            [
                21504,
                55296
            ]
        ],
        "continent_rect": [
            [
                54528,
                27648
            ],
            [
                56320,
                32256
            ]
        ],
        "map_name": "One Good Drink Deserves Another"
    },
    "399": {
        "min_level": 10,
        "max_level": 10,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 1,
        "region_name": "Shiverpeak Mountains",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -21504,
                -55296
            ],
            [
                21504,
                55296
            ]
        ],
        "continent_rect": [
            [
                54528,
                27648
            ],
            [
                56320,
                32256
            ]
        ],
        "map_name": "Shape of the Spirit"
    },
    "400": {
        "min_level": 10,
        "max_level": 10,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1,
            2
        ],
        "region_id": 1,
        "region_name": "Shiverpeak Mountains",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -27648,
                -18432
            ],
            [
                27648,
                21504
            ]
        ],
        "continent_rect": [
            [
                52224,
                29696
            ],
            [
                54528,
                31360
            ]
        ],
        "map_name": "Into the Mists"
    },
    "401": {
        "min_level": 10,
        "max_level": 10,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1,
            2
        ],
        "region_id": 1,
        "region_name": "Shiverpeak Mountains",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -27648,
                -18432
            ],
            [
                27648,
                21504
            ]
        ],
        "continent_rect": [
            [
                52224,
                29696
            ],
            [
                54528,
                31360
            ]
        ],
        "map_name": "Through the Veil"
    },
    "405": {
        "min_level": 10,
        "max_level": 10,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "map_rect": [
            [
                -21504,
                -55296
            ],
            [
                21504,
                55296
            ]
        ],
        "continent_rect": [
            [
                54528,
                27648
            ],
            [
                56320,
                32256
            ]
        ],
        "map_name": "Blessed of Bear"
    },
    "407": {
        "min_level": 10,
        "max_level": 10,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 1,
        "region_name": "Shiverpeak Mountains",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -21504,
                -55296
            ],
            [
                21504,
                55296
            ]
        ],
        "continent_rect": [
            [
                54528,
                27648
            ],
            [
                56320,
                32256
            ]
        ],
        "map_name": "The Wolf Havroun"
    },
    "410": {
        "min_level": 10,
        "max_level": 10,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1,
            2
        ],
        "region_id": 1,
        "region_name": "Shiverpeak Mountains",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -27648,
                -18432
            ],
            [
                27648,
                21504
            ]
        ],
        "continent_rect": [
            [
                52224,
                29696
            ],
            [
                54528,
                31360
            ]
        ],
        "map_name": "Minotaur Rampant"
    },
    "411": {
        "min_level": 10,
        "max_level": 10,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 1,
        "region_name": "Shiverpeak Mountains",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -21504,
                -55296
            ],
            [
                21504,
                55296
            ]
        ],
        "continent_rect": [
            [
                54528,
                27648
            ],
            [
                56320,
                32256
            ]
        ],
        "map_name": "Minotaur Rampant"
    },
    "412": {
        "min_level": 20,
        "max_level": 20,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1,
            2
        ],
        "region_id": 1,
        "region_name": "Shiverpeak Mountains",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -27648,
                -18432
            ],
            [
                27648,
                21504
            ]
        ],
        "continent_rect": [
            [
                52224,
                29696
            ],
            [
                54528,
                31360
            ]
        ],
        "map_name": "Unexpected Visitors"
    },
    "413": {
        "min_level": 20,
        "max_level": 20,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1,
            2
        ],
        "region_id": 1,
        "region_name": "Shiverpeak Mountains",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -27648,
                -18432
            ],
            [
                27648,
                21504
            ]
        ],
        "continent_rect": [
            [
                52224,
                29696
            ],
            [
                54528,
                31360
            ]
        ],
        "map_name": "Rumors of Trouble"
    },
    "414": {
        "min_level": 20,
        "max_level": 20,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1,
            2
        ],
        "region_id": 1,
        "region_name": "Shiverpeak Mountains",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -27648,
                -18432
            ],
            [
                27648,
                21504
            ]
        ],
        "continent_rect": [
            [
                52224,
                29696
            ],
            [
                54528,
                31360
            ]
        ],
        "map_name": "A New Challenger"
    },
    "415": {
        "min_level": 20,
        "max_level": 20,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 1,
        "region_name": "Shiverpeak Mountains",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -21504,
                -55296
            ],
            [
                21504,
                55296
            ]
        ],
        "continent_rect": [
            [
                54528,
                27648
            ],
            [
                56320,
                32256
            ]
        ],
        "map_name": "Unexpected Visitors"
    },
    "416": {
        "min_level": 20,
        "max_level": 20,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 2,
        "region_name": "Ascalon",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -43008,
                -27648
            ],
            [
                43008,
                27648
            ]
        ],
        "continent_rect": [
            [
                56320,
                27648
            ],
            [
                59904,
                29952
            ]
        ],
        "map_name": "Roadblock"
    },
    "417": {
        "min_level": 20,
        "max_level": 20,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 2,
        "region_name": "Ascalon",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -43008,
                -27648
            ],
            [
                43008,
                27648
            ]
        ],
        "continent_rect": [
            [
                56320,
                27648
            ],
            [
                59904,
                29952
            ]
        ],
        "map_name": "Assault on Moledavia"
    },
    "418": {
        "min_level": 20,
        "max_level": 20,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 1,
        "region_name": "Shiverpeak Mountains",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -21504,
                -55296
            ],
            [
                21504,
                55296
            ]
        ],
        "continent_rect": [
            [
                54528,
                27648
            ],
            [
                56320,
                32256
            ]
        ],
        "map_name": "Don't Leave Your Toys Out"
    },
    "419": {
        "min_level": 20,
        "max_level": 20,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 1,
        "region_name": "Shiverpeak Mountains",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -21504,
                -55296
            ],
            [
                21504,
                55296
            ]
        ],
        "continent_rect": [
            [
                54528,
                27648
            ],
            [
                56320,
                32256
            ]
        ],
        "map_name": "A New Challenger"
    },
    "420": {
        "min_level": 20,
        "max_level": 20,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 1,
        "region_name": "Shiverpeak Mountains",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -21504,
                -55296
            ],
            [
                21504,
                55296
            ]
        ],
        "continent_rect": [
            [
                54528,
                27648
            ],
            [
                56320,
                32256
            ]
        ],
        "map_name": "First Attack"
    },
    "421": {
        "min_level": 20,
        "max_level": 20,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 1,
        "region_name": "Shiverpeak Mountains",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -21504,
                -55296
            ],
            [
                21504,
                55296
            ]
        ],
        "continent_rect": [
            [
                54528,
                27648
            ],
            [
                56320,
                32256
            ]
        ],
        "map_name": "The Finishing Blow"
    },
    "422": {
        "min_level": 20,
        "max_level": 20,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 2,
        "region_name": "Ascalon",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -43008,
                -27648
            ],
            [
                43008,
                27648
            ]
        ],
        "continent_rect": [
            [
                56320,
                27648
            ],
            [
                59904,
                29952
            ]
        ],
        "map_name": "The Semifinals"
    },
    "423": {
        "min_level": 20,
        "max_level": 20,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1,
            2
        ],
        "region_id": 1,
        "region_name": "Shiverpeak Mountains",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -27648,
                -18432
            ],
            [
                27648,
                21504
            ]
        ],
        "continent_rect": [
            [
                52224,
                29696
            ],
            [
                54528,
                31360
            ]
        ],
        "map_name": "The Championship Fight"
    },
    "424": {
        "min_level": 20,
        "max_level": 20,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1,
            2
        ],
        "region_id": 1,
        "region_name": "Shiverpeak Mountains",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -27648,
                -18432
            ],
            [
                27648,
                21504
            ]
        ],
        "continent_rect": [
            [
                52224,
                29696
            ],
            [
                54528,
                31360
            ]
        ],
        "map_name": "The Championship Fight"
    },
    "425": {
        "min_level": 20,
        "max_level": 20,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 2,
        "region_name": "Ascalon",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -43008,
                -27648
            ],
            [
                43008,
                27648
            ]
        ],
        "continent_rect": [
            [
                56320,
                27648
            ],
            [
                59904,
                29952
            ]
        ],
        "map_name": "The Machine in Action"
    },
    "427": {
        "min_level": 20,
        "max_level": 20,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 1,
        "region_name": "Shiverpeak Mountains",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -49152,
                -24576
            ],
            [
                49152,
                24576
            ]
        ],
        "continent_rect": [
            [
                50432,
                27648
            ],
            [
                54528,
                29696
            ]
        ],
        "map_name": "Among the Kodan"
    },
    "428": {
        "min_level": 20,
        "max_level": 20,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 1,
        "region_name": "Shiverpeak Mountains",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -21504,
                -55296
            ],
            [
                21504,
                55296
            ]
        ],
        "continent_rect": [
            [
                54528,
                27648
            ],
            [
                56320,
                32256
            ]
        ],
        "map_name": "Rumors of Trouble"
    },
    "429": {
        "min_level": 10,
        "max_level": 10,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1,
            2
        ],
        "region_id": 1,
        "region_name": "Shiverpeak Mountains",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -27648,
                -18432
            ],
            [
                27648,
                21504
            ]
        ],
        "continent_rect": [
            [
                52224,
                29696
            ],
            [
                54528,
                31360
            ]
        ],
        "map_name": "Rage of the Minotaurs"
    },
    "430": {
        "min_level": 20,
        "max_level": 20,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 1,
        "region_name": "Shiverpeak Mountains",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -49152,
                -24576
            ],
            [
                49152,
                24576
            ]
        ],
        "continent_rect": [
            [
                50432,
                27648
            ],
            [
                54528,
                29696
            ]
        ],
        "map_name": "Darkness at Drakentelt"
    },
    "432": {
        "min_level": 1,
        "max_level": 1,
        "default_floor": -15,
        "type": "Tutorial",
        "floors": [
            -15
        ],
        "region_id": 5,
        "region_name": "Tarnished Coast",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -21504,
                -46080
            ],
            [
                24576,
                49152
            ]
        ],
        "continent_rect": [
            [
                42112,
                32512
            ],
            [
                44032,
                36480
            ]
        ],
        "map_name": "Fighting the Nightmare"
    },
    "434": {
        "min_level": 20,
        "max_level": 20,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 1,
        "region_name": "Shiverpeak Mountains",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -49152,
                -24576
            ],
            [
                49152,
                24576
            ]
        ],
        "continent_rect": [
            [
                50432,
                27648
            ],
            [
                54528,
                29696
            ]
        ],
        "map_name": "Preserving the Balance"
    },
    "435": {
        "min_level": 20,
        "max_level": 20,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1,
            2
        ],
        "region_id": 1,
        "region_name": "Shiverpeak Mountains",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -27648,
                -18432
            ],
            [
                27648,
                21504
            ]
        ],
        "continent_rect": [
            [
                52224,
                29696
            ],
            [
                54528,
                31360
            ]
        ],
        "map_name": "Means to an End"
    },
    "436": {
        "min_level": 30,
        "max_level": 30,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1,
            2
        ],
        "region_id": 1,
        "region_name": "Shiverpeak Mountains",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -27648,
                -18432
            ],
            [
                27648,
                21504
            ]
        ],
        "continent_rect": [
            [
                52224,
                29696
            ],
            [
                54528,
                31360
            ]
        ],
        "map_name": "Dredge Technology"
    },
    "439": {
        "min_level": 30,
        "max_level": 30,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 1,
        "region_name": "Shiverpeak Mountains",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -49152,
                -24576
            ],
            [
                49152,
                24576
            ]
        ],
        "continent_rect": [
            [
                50432,
                27648
            ],
            [
                54528,
                29696
            ]
        ],
        "map_name": "Underground Scholar"
    },
    "440": {
        "min_level": 30,
        "max_level": 30,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 1,
        "region_name": "Shiverpeak Mountains",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -49152,
                -24576
            ],
            [
                49152,
                24576
            ]
        ],
        "continent_rect": [
            [
                50432,
                27648
            ],
            [
                54528,
                29696
            ]
        ],
        "map_name": "Dredge Assault"
    },
    "441": {
        "min_level": 30,
        "max_level": 30,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 1,
        "region_name": "Shiverpeak Mountains",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -49152,
                -24576
            ],
            [
                49152,
                24576
            ]
        ],
        "continent_rect": [
            [
                50432,
                27648
            ],
            [
                54528,
                29696
            ]
        ],
        "map_name": "The Dredge Hideout"
    },
    "444": {
        "min_level": 30,
        "max_level": 30,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 1,
        "region_name": "Shiverpeak Mountains",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -21504,
                -58368
            ],
            [
                21504,
                58368
            ]
        ],
        "continent_rect": [
            [
                50432,
                29696
            ],
            [
                52224,
                34560
            ]
        ],
        "map_name": "Sabotage"
    },
    "447": {
        "min_level": 30,
        "max_level": 30,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 1,
        "region_name": "Shiverpeak Mountains",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -21504,
                -58368
            ],
            [
                21504,
                58368
            ]
        ],
        "continent_rect": [
            [
                50432,
                29696
            ],
            [
                52224,
                34560
            ]
        ],
        "map_name": "Codebreaker"
    },
    "449": {
        "min_level": 30,
        "max_level": 30,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 1,
        "region_name": "Shiverpeak Mountains",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -49152,
                -24576
            ],
            [
                49152,
                24576
            ]
        ],
        "continent_rect": [
            [
                50432,
                27648
            ],
            [
                54528,
                29696
            ]
        ],
        "map_name": "Armaments"
    },
    "453": {
        "min_level": 30,
        "max_level": 30,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 1,
        "region_name": "Shiverpeak Mountains",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -21504,
                -58368
            ],
            [
                21504,
                58368
            ]
        ],
        "continent_rect": [
            [
                50432,
                29696
            ],
            [
                52224,
                34560
            ]
        ],
        "map_name": "Assault the Hill"
    },
    "454": {
        "min_level": 30,
        "max_level": 30,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 1,
        "region_name": "Shiverpeak Mountains",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -21504,
                -58368
            ],
            [
                21504,
                58368
            ]
        ],
        "continent_rect": [
            [
                50432,
                29696
            ],
            [
                52224,
                34560
            ]
        ],
        "map_name": "Silent Warfare"
    },
    "455": {
        "min_level": 30,
        "max_level": 30,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 1,
        "region_name": "Shiverpeak Mountains",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -21504,
                -58368
            ],
            [
                21504,
                58368
            ]
        ],
        "continent_rect": [
            [
                50432,
                29696
            ],
            [
                52224,
                34560
            ]
        ],
        "map_name": "Sever the Head"
    },
    "458": {
        "min_level": 1,
        "max_level": 1,
        "default_floor": 1,
        "type": "Tutorial",
        "floors": [
            1
        ],
        "region_id": 2,
        "region_name": "Ascalon",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -49152,
                -24576
            ],
            [
                49152,
                24576
            ]
        ],
        "continent_rect": [
            [
                57856,
                29952
            ],
            [
                61952,
                32000
            ]
        ],
        "map_name": "Fury of the Dead"
    },
    "459": {
        "min_level": 20,
        "max_level": 20,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 2,
        "region_name": "Ascalon",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -18432,
                -24576
            ],
            [
                18432,
                24576
            ]
        ],
        "continent_rect": [
            [
                56320,
                29952
            ],
            [
                57856,
                32000
            ]
        ],
        "map_name": "A Fork in the Road"
    },
    "460": {
        "min_level": 0,
        "max_level": 0,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1,
            3,
            2,
            0
        ],
        "region_id": 2,
        "region_name": "Ascalon",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -18432,
                -24576
            ],
            [
                18432,
                24576
            ]
        ],
        "continent_rect": [
            [
                56320,
                29952
            ],
            [
                57856,
                32000
            ]
        ],
        "map_name": "Citadel Stockade"
    },
    "464": {
        "min_level": 20,
        "max_level": 20,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 2,
        "region_name": "Ascalon",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -18432,
                -24576
            ],
            [
                18432,
                24576
            ]
        ],
        "continent_rect": [
            [
                56320,
                29952
            ],
            [
                57856,
                32000
            ]
        ],
        "map_name": "Tribunes in Effigy"
    },
    "465": {
        "min_level": 20,
        "max_level": 20,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 2,
        "region_name": "Ascalon",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -18432,
                -24576
            ],
            [
                18432,
                24576
            ]
        ],
        "continent_rect": [
            [
                56320,
                29952
            ],
            [
                57856,
                32000
            ]
        ],
        "map_name": "Sins of the Father"
    },
    "466": {
        "min_level": 20,
        "max_level": 20,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 2,
        "region_name": "Ascalon",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -18432,
                -24576
            ],
            [
                18432,
                24576
            ]
        ],
        "continent_rect": [
            [
                56320,
                29952
            ],
            [
                57856,
                32000
            ]
        ],
        "map_name": "Misplaced Faith"
    },
    "470": {
        "min_level": 30,
        "max_level": 30,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 2,
        "region_name": "Ascalon",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -49152,
                -24576
            ],
            [
                49152,
                24576
            ]
        ],
        "continent_rect": [
            [
                57856,
                29952
            ],
            [
                61952,
                32000
            ]
        ],
        "map_name": "Graveyard Ornaments"
    },
    "471": {
        "min_level": 30,
        "max_level": 30,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 1,
        "region_name": "Shiverpeak Mountains",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -49152,
                -24576
            ],
            [
                49152,
                24576
            ]
        ],
        "continent_rect": [
            [
                50432,
                27648
            ],
            [
                54528,
                29696
            ]
        ],
        "map_name": "Undead Infestation"
    },
    "474": {
        "min_level": 30,
        "max_level": 30,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 1,
        "region_name": "Shiverpeak Mountains",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -49152,
                -24576
            ],
            [
                49152,
                24576
            ]
        ],
        "continent_rect": [
            [
                50432,
                27648
            ],
            [
                54528,
                29696
            ]
        ],
        "map_name": "Whispers in the Dark"
    },
    "476": {
        "min_level": 30,
        "max_level": 30,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 1,
        "region_name": "Shiverpeak Mountains",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -49152,
                -24576
            ],
            [
                49152,
                24576
            ]
        ],
        "continent_rect": [
            [
                50432,
                27648
            ],
            [
                54528,
                29696
            ]
        ],
        "map_name": "Dangerous Research"
    },
    "477": {
        "min_level": 30,
        "max_level": 30,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 1,
        "region_name": "Shiverpeak Mountains",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -49152,
                -24576
            ],
            [
                49152,
                24576
            ]
        ],
        "continent_rect": [
            [
                50432,
                27648
            ],
            [
                54528,
                29696
            ]
        ],
        "map_name": "Digging Up Answers"
    },
    "480": {
        "min_level": 30,
        "max_level": 30,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 4,
        "region_name": "Kryta",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -49152,
                -24576
            ],
            [
                52224,
                24576
            ]
        ],
        "continent_rect": [
            [
                46208,
                28672
            ],
            [
                50432,
                30720
            ]
        ],
        "map_name": "Defending the Keep"
    },
    "481": {
        "min_level": 30,
        "max_level": 30,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 4,
        "region_name": "Kryta",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -49152,
                -24576
            ],
            [
                52224,
                24576
            ]
        ],
        "continent_rect": [
            [
                46208,
                28672
            ],
            [
                50432,
                30720
            ]
        ],
        "map_name": "Undead Detection"
    },
    "483": {
        "min_level": 30,
        "max_level": 30,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 4,
        "region_name": "Kryta",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -49152,
                -24576
            ],
            [
                52224,
                24576
            ]
        ],
        "continent_rect": [
            [
                46208,
                28672
            ],
            [
                50432,
                30720
            ]
        ],
        "map_name": "Ever Vigilant"
    },
    "485": {
        "min_level": 30,
        "max_level": 30,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 4,
        "region_name": "Kryta",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -49152,
                -24576
            ],
            [
                52224,
                24576
            ]
        ],
        "continent_rect": [
            [
                46208,
                28672
            ],
            [
                50432,
                30720
            ]
        ],
        "map_name": "Research and Destroy"
    },
    "487": {
        "min_level": 30,
        "max_level": 30,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 2,
        "region_name": "Ascalon",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -49152,
                -24576
            ],
            [
                52224,
                24576
            ]
        ],
        "continent_rect": [
            [
                46208,
                28672
            ],
            [
                50432,
                30720
            ]
        ],
        "map_name": "Whispers of Vengeance"
    },
    "488": {
        "min_level": 40,
        "max_level": 40,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 2,
        "region_name": "Ascalon",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -36864,
                -36864
            ],
            [
                36864,
                36864
            ]
        ],
        "continent_rect": [
            [
                61440,
                32640
            ],
            [
                64512,
                35712
            ]
        ],
        "map_name": "Killer Instinct"
    },
    "489": {
        "min_level": 40,
        "max_level": 40,
        "default_floor": 43,
        "type": "Instance",
        "floors": [
            43
        ],
        "map_rect": [
            [
                -27648,
                -18432
            ],
            [
                30720,
                18432
            ]
        ],
        "continent_rect": [
            [
                48000,
                30720
            ],
            [
                50432,
                32256
            ]
        ],
        "map_name": "Meeting my Mentor"
    },
    "490": {
        "min_level": 40,
        "max_level": 40,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 2,
        "region_name": "Ascalon",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -36864,
                -36864
            ],
            [
                36864,
                36864
            ]
        ],
        "continent_rect": [
            [
                61440,
                32640
            ],
            [
                64512,
                35712
            ]
        ],
        "map_name": "A Fragile Peace"
    },
    "492": {
        "min_level": 40,
        "max_level": 40,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 2,
        "region_name": "Ascalon",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -36864,
                -36864
            ],
            [
                36864,
                36864
            ]
        ],
        "continent_rect": [
            [
                61440,
                32640
            ],
            [
                64512,
                35712
            ]
        ],
        "map_name": "Don't Shoot the Messenger"
    },
    "496": {
        "min_level": 40,
        "max_level": 40,
        "default_floor": 43,
        "type": "Instance",
        "floors": [
            43
        ],
        "region_id": 4,
        "region_name": "Kryta",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -27648,
                -18432
            ],
            [
                30720,
                18432
            ]
        ],
        "continent_rect": [
            [
                48000,
                30720
            ],
            [
                50432,
                32256
            ]
        ],
        "map_name": "Meeting my Mentor"
    },
    "497": {
        "min_level": 40,
        "max_level": 40,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 1,
        "region_name": "Shiverpeak Mountains",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -21504,
                -58368
            ],
            [
                21504,
                58368
            ]
        ],
        "continent_rect": [
            [
                50432,
                29696
            ],
            [
                52224,
                34560
            ]
        ],
        "map_name": "Dredging Up the Past"
    },
    "498": {
        "min_level": 40,
        "max_level": 40,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 1,
        "region_name": "Shiverpeak Mountains",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -21504,
                -58368
            ],
            [
                21504,
                58368
            ]
        ],
        "continent_rect": [
            [
                50432,
                29696
            ],
            [
                52224,
                34560
            ]
        ],
        "map_name": "Dredging Up the Past"
    },
    "499": {
        "min_level": 10,
        "max_level": 10,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 2,
        "region_name": "Ascalon",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -18432,
                -24576
            ],
            [
                18432,
                24576
            ]
        ],
        "continent_rect": [
            [
                56320,
                29952
            ],
            [
                57856,
                32000
            ]
        ],
        "map_name": "Scrapyard Dogs"
    },
    "502": {
        "min_level": 40,
        "max_level": 40,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 2,
        "region_name": "Ascalon",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -36864,
                -36864
            ],
            [
                36864,
                36864
            ]
        ],
        "continent_rect": [
            [
                61440,
                32640
            ],
            [
                64512,
                35712
            ]
        ],
        "map_name": "Quaestor's Siege"
    },
    "503": {
        "min_level": 40,
        "max_level": 40,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 2,
        "region_name": "Ascalon",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -36864,
                -36864
            ],
            [
                36864,
                36864
            ]
        ],
        "continent_rect": [
            [
                61440,
                32640
            ],
            [
                64512,
                35712
            ]
        ],
        "map_name": "Minister's Defense"
    },
    "504": {
        "min_level": 10,
        "max_level": 10,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1,
            3,
            2,
            0
        ],
        "region_id": 5,
        "region_name": "Tarnished Coast",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -15360,
                -24576
            ],
            [
                18432,
                24576
            ]
        ],
        "continent_rect": [
            [
                42496,
                36480
            ],
            [
                43904,
                38528
            ]
        ],
        "map_name": "Called to Service"
    },
    "505": {
        "min_level": 10,
        "max_level": 10,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 5,
        "region_name": "Tarnished Coast",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -21504,
                -46080
            ],
            [
                24576,
                49152
            ]
        ],
        "continent_rect": [
            [
                42112,
                32512
            ],
            [
                44032,
                36480
            ]
        ],
        "map_name": "Called to Service"
    },
    "507": {
        "min_level": 10,
        "max_level": 10,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1,
            3,
            2,
            0
        ],
        "region_id": 5,
        "region_name": "Tarnished Coast",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -15360,
                -24576
            ],
            [
                18432,
                24576
            ]
        ],
        "continent_rect": [
            [
                42496,
                36480
            ],
            [
                43904,
                38528
            ]
        ],
        "map_name": "Mockery of Death"
    },
    "509": {
        "min_level": 10,
        "max_level": 10,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 5,
        "region_name": "Tarnished Coast",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -21504,
                -46080
            ],
            [
                24576,
                49152
            ]
        ],
        "continent_rect": [
            [
                42112,
                32512
            ],
            [
                44032,
                36480
            ]
        ],
        "map_name": "Discovering Darkness"
    },
    "511": {
        "min_level": 10,
        "max_level": 10,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 2,
        "region_name": "Ascalon",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -21504,
                -46080
            ],
            [
                24576,
                49152
            ]
        ],
        "continent_rect": [
            [
                42112,
                32512
            ],
            [
                44032,
                36480
            ]
        ],
        "map_name": "Hounds and the Hunted"
    },
    "512": {
        "min_level": 10,
        "max_level": 10,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1,
            3,
            2,
            0
        ],
        "region_id": 2,
        "region_name": "Ascalon",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -15360,
                -24576
            ],
            [
                18432,
                24576
            ]
        ],
        "continent_rect": [
            [
                42496,
                36480
            ],
            [
                43904,
                38528
            ]
        ],
        "map_name": "Hounds and the Hunted"
    },
    "513": {
        "min_level": 10,
        "max_level": 10,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 5,
        "region_name": "Tarnished Coast",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -21504,
                -46080
            ],
            [
                24576,
                49152
            ]
        ],
        "continent_rect": [
            [
                42112,
                32512
            ],
            [
                44032,
                36480
            ]
        ],
        "map_name": "Loved and Lost"
    },
    "514": {
        "min_level": 10,
        "max_level": 10,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 5,
        "region_name": "Tarnished Coast",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -21504,
                -46080
            ],
            [
                24576,
                49152
            ]
        ],
        "continent_rect": [
            [
                42112,
                32512
            ],
            [
                44032,
                36480
            ]
        ],
        "map_name": "Saving the Stag"
    },
    "515": {
        "min_level": 10,
        "max_level": 10,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 5,
        "region_name": "Tarnished Coast",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -21504,
                -46080
            ],
            [
                24576,
                49152
            ]
        ],
        "continent_rect": [
            [
                42112,
                32512
            ],
            [
                44032,
                36480
            ]
        ],
        "map_name": "Hidden in Darkness"
    },
    "516": {
        "min_level": 10,
        "max_level": 10,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 5,
        "region_name": "Tarnished Coast",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -21504,
                -46080
            ],
            [
                24576,
                49152
            ]
        ],
        "continent_rect": [
            [
                42112,
                32512
            ],
            [
                44032,
                36480
            ]
        ],
        "map_name": "Good Work Spoiled"
    },
    "517": {
        "min_level": 10,
        "max_level": 10,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1,
            3,
            2,
            0
        ],
        "region_id": 5,
        "region_name": "Tarnished Coast",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -15360,
                -24576
            ],
            [
                18432,
                24576
            ]
        ],
        "continent_rect": [
            [
                42496,
                36480
            ],
            [
                43904,
                38528
            ]
        ],
        "map_name": "Black Night, White Stag"
    },
    "518": {
        "min_level": 10,
        "max_level": 10,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1,
            3,
            2,
            0
        ],
        "region_id": 5,
        "region_name": "Tarnished Coast",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -15360,
                -24576
            ],
            [
                18432,
                24576
            ]
        ],
        "continent_rect": [
            [
                42496,
                36480
            ],
            [
                43904,
                38528
            ]
        ],
        "map_name": "The Omphalos Chamber"
    },
    "519": {
        "min_level": 10,
        "max_level": 10,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 5,
        "region_name": "Tarnished Coast",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -21504,
                -46080
            ],
            [
                24576,
                49152
            ]
        ],
        "continent_rect": [
            [
                42112,
                32512
            ],
            [
                44032,
                36480
            ]
        ],
        "map_name": "Weakness of the Heart"
    },
    "520": {
        "min_level": 10,
        "max_level": 10,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1,
            3,
            2,
            0
        ],
        "region_id": 5,
        "region_name": "Tarnished Coast",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -15360,
                -24576
            ],
            [
                18432,
                24576
            ]
        ],
        "continent_rect": [
            [
                42496,
                36480
            ],
            [
                43904,
                38528
            ]
        ],
        "map_name": "Awakening"
    },
    "521": {
        "min_level": 10,
        "max_level": 10,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 5,
        "region_name": "Tarnished Coast",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -21504,
                -46080
            ],
            [
                24576,
                49152
            ]
        ],
        "continent_rect": [
            [
                42112,
                32512
            ],
            [
                44032,
                36480
            ]
        ],
        "map_name": "Holding Back the Darkness"
    },
    "522": {
        "min_level": 10,
        "max_level": 10,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1,
            3,
            2,
            0
        ],
        "region_id": 5,
        "region_name": "Tarnished Coast",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -15360,
                -24576
            ],
            [
                18432,
                24576
            ]
        ],
        "continent_rect": [
            [
                42496,
                36480
            ],
            [
                43904,
                38528
            ]
        ],
        "map_name": "A Sly Trick"
    },
    "523": {
        "min_level": 10,
        "max_level": 10,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 5,
        "region_name": "Tarnished Coast",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -21504,
                -46080
            ],
            [
                24576,
                49152
            ]
        ],
        "continent_rect": [
            [
                42112,
                32512
            ],
            [
                44032,
                36480
            ]
        ],
        "map_name": "Deep Tangled Roots"
    },
    "524": {
        "min_level": 10,
        "max_level": 10,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 5,
        "region_name": "Tarnished Coast",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -21504,
                -46080
            ],
            [
                24576,
                49152
            ]
        ],
        "continent_rect": [
            [
                42112,
                32512
            ],
            [
                44032,
                36480
            ]
        ],
        "map_name": "The Heart of Nightmare"
    },
    "525": {
        "min_level": 10,
        "max_level": 10,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 5,
        "region_name": "Tarnished Coast",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -21504,
                -46080
            ],
            [
                24576,
                49152
            ]
        ],
        "continent_rect": [
            [
                42112,
                32512
            ],
            [
                44032,
                36480
            ]
        ],
        "map_name": "Beneath a Cold Moon"
    },
    "527": {
        "min_level": 10,
        "max_level": 10,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 5,
        "region_name": "Tarnished Coast",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -21504,
                -46080
            ],
            [
                24576,
                49152
            ]
        ],
        "continent_rect": [
            [
                42112,
                32512
            ],
            [
                44032,
                36480
            ]
        ],
        "map_name": "The Knight's Duel"
    },
    "528": {
        "min_level": 10,
        "max_level": 10,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 5,
        "region_name": "Tarnished Coast",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -21504,
                -46080
            ],
            [
                24576,
                49152
            ]
        ],
        "continent_rect": [
            [
                42112,
                32512
            ],
            [
                44032,
                36480
            ]
        ],
        "map_name": "Hammer and Steel"
    },
    "529": {
        "min_level": 20,
        "max_level": 20,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 5,
        "region_name": "Tarnished Coast",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -21504,
                -46080
            ],
            [
                24576,
                49152
            ]
        ],
        "continent_rect": [
            [
                42112,
                32512
            ],
            [
                44032,
                36480
            ]
        ],
        "map_name": "Where Life Goes"
    },
    "532": {
        "min_level": 20,
        "max_level": 20,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1,
            3,
            2,
            0
        ],
        "region_id": 5,
        "region_name": "Tarnished Coast",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -15360,
                -24576
            ],
            [
                18432,
                24576
            ]
        ],
        "continent_rect": [
            [
                42496,
                36480
            ],
            [
                43904,
                38528
            ]
        ],
        "map_name": "After the Storm"
    },
    "533": {
        "min_level": 20,
        "max_level": 20,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 5,
        "region_name": "Tarnished Coast",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -21504,
                -46080
            ],
            [
                24576,
                49152
            ]
        ],
        "continent_rect": [
            [
                42112,
                32512
            ],
            [
                44032,
                36480
            ]
        ],
        "map_name": "After the Storm"
    },
    "534": {
        "min_level": 20,
        "max_level": 20,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 5,
        "region_name": "Tarnished Coast",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -21504,
                -46080
            ],
            [
                24576,
                49152
            ]
        ],
        "continent_rect": [
            [
                42112,
                32512
            ],
            [
                44032,
                36480
            ]
        ],
        "map_name": "Beneath the Waves"
    },
    "535": {
        "min_level": 20,
        "max_level": 20,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 5,
        "region_name": "Tarnished Coast",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -39936,
                -30720
            ],
            [
                43008,
                33792
            ]
        ],
        "continent_rect": [
            [
                38656,
                30848
            ],
            [
                42112,
                33536
            ]
        ],
        "map_name": "Mirror, Mirror"
    },
    "536": {
        "min_level": 20,
        "max_level": 20,
        "default_floor": -16,
        "type": "Instance",
        "floors": [
            1,
            -16,
            3,
            2,
            0
        ],
        "region_id": 5,
        "region_name": "Tarnished Coast",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -33792,
                -24576
            ],
            [
                33792,
                24576
            ]
        ],
        "continent_rect": [
            [
                41088,
                36480
            ],
            [
                43904,
                38528
            ]
        ],
        "map_name": "A Vision of Darkness"
    },
    "537": {
        "min_level": 20,
        "max_level": 20,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1,
            3,
            0
        ],
        "region_id": 5,
        "region_name": "Tarnished Coast",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -39936,
                -30720
            ],
            [
                43008,
                33792
            ]
        ],
        "continent_rect": [
            [
                42496,
                36480
            ],
            [
                43904,
                38528
            ]
        ],
        "map_name": "Shattered Light"
    },
    "538": {
        "min_level": 20,
        "max_level": 20,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 5,
        "region_name": "Tarnished Coast",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -39936,
                -30720
            ],
            [
                43008,
                33792
            ]
        ],
        "continent_rect": [
            [
                38656,
                30848
            ],
            [
                42112,
                33536
            ]
        ],
        "map_name": "An Unknown Soul"
    },
    "539": {
        "min_level": 20,
        "max_level": 20,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1,
            3,
            2,
            0
        ],
        "region_id": 5,
        "region_name": "Tarnished Coast",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -15360,
                -24576
            ],
            [
                18432,
                24576
            ]
        ],
        "continent_rect": [
            [
                42496,
                36480
            ],
            [
                43904,
                38528
            ]
        ],
        "map_name": "An Unknown Soul"
    },
    "540": {
        "min_level": 20,
        "max_level": 20,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1,
            3,
            2,
            0
        ],
        "region_id": 5,
        "region_name": "Tarnished Coast",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -15360,
                -24576
            ],
            [
                18432,
                24576
            ]
        ],
        "continent_rect": [
            [
                42496,
                36480
            ],
            [
                43904,
                38528
            ]
        ],
        "map_name": "Where Life Goes"
    },
    "542": {
        "min_level": 20,
        "max_level": 20,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "map_rect": [
            [
                -39936,
                -30720
            ],
            [
                43008,
                33792
            ]
        ],
        "continent_rect": [
            [
                38656,
                30848
            ],
            [
                42112,
                33536
            ]
        ],
        "map_name": "Source of the Issue"
    },
    "543": {
        "min_level": 20,
        "max_level": 20,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1,
            3,
            2,
            0
        ],
        "region_id": 5,
        "region_name": "Tarnished Coast",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -15360,
                -24576
            ],
            [
                18432,
                24576
            ]
        ],
        "continent_rect": [
            [
                42496,
                36480
            ],
            [
                43904,
                38528
            ]
        ],
        "map_name": "Wild Growth"
    },
    "544": {
        "min_level": 20,
        "max_level": 20,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 5,
        "region_name": "Tarnished Coast",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -21504,
                -46080
            ],
            [
                24576,
                49152
            ]
        ],
        "continent_rect": [
            [
                42112,
                32512
            ],
            [
                44032,
                36480
            ]
        ],
        "map_name": "Wild Growth"
    },
    "545": {
        "min_level": 20,
        "max_level": 20,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 5,
        "region_name": "Tarnished Coast",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -21504,
                -46080
            ],
            [
                24576,
                49152
            ]
        ],
        "continent_rect": [
            [
                42112,
                32512
            ],
            [
                44032,
                36480
            ]
        ],
        "map_name": "Seeking the Zalisco"
    },
    "546": {
        "min_level": 20,
        "max_level": 20,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 5,
        "region_name": "Tarnished Coast",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -21504,
                -46080
            ],
            [
                24576,
                49152
            ]
        ],
        "continent_rect": [
            [
                42112,
                32512
            ],
            [
                44032,
                36480
            ]
        ],
        "map_name": "The Direct Approach"
    },
    "547": {
        "min_level": 20,
        "max_level": 20,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 5,
        "region_name": "Tarnished Coast",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -21504,
                -46080
            ],
            [
                24576,
                49152
            ]
        ],
        "continent_rect": [
            [
                42112,
                32512
            ],
            [
                44032,
                36480
            ]
        ],
        "map_name": "Trading Trickery"
    },
    "548": {
        "min_level": 20,
        "max_level": 20,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1,
            3,
            2,
            0
        ],
        "region_id": 5,
        "region_name": "Tarnished Coast",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -15360,
                -24576
            ],
            [
                18432,
                24576
            ]
        ],
        "continent_rect": [
            [
                42496,
                36480
            ],
            [
                43904,
                38528
            ]
        ],
        "map_name": "Eye of the Sun"
    },
    "549": {
        "min_level": 0,
        "max_level": 0,
        "default_floor": 6,
        "type": "Pvp",
        "floors": [
            1,
            6
        ],
        "region_id": 6,
        "region_name": "Player vs. Player",
        "continent_id": 2,
        "continent_name": "Mists",
        "map_rect": [
            [
                -9216,
                -9216
            ],
            [
                9216,
                9216
            ]
        ],
        "continent_rect": [
            [
                3326,
                5374
            ],
            [
                4094,
                6142
            ]
        ],
        "map_name": "Battle of Kyhlo"
    },
    "552": {
        "min_level": 20,
        "max_level": 20,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1,
            3,
            2,
            0
        ],
        "region_id": 5,
        "region_name": "Tarnished Coast",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -15360,
                -24576
            ],
            [
                18432,
                24576
            ]
        ],
        "continent_rect": [
            [
                42496,
                36480
            ],
            [
                43904,
                38528
            ]
        ],
        "map_name": "Seeking the Zalisco"
    },
    "554": {
        "min_level": 0,
        "max_level": 0,
        "default_floor": 5,
        "type": "Pvp",
        "floors": [
            1,
            5
        ],
        "region_id": 6,
        "region_name": "Player vs. Player",
        "continent_id": 2,
        "continent_name": "Mists",
        "map_rect": [
            [
                -12288,
                -6144
            ],
            [
                12288,
                9216
            ]
        ],
        "continent_rect": [
            [
                7038,
                4860
            ],
            [
                8062,
                5500
            ]
        ],
        "map_name": "Forest of Niflhel"
    },
    "556": {
        "min_level": 20,
        "max_level": 20,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 5,
        "region_name": "Tarnished Coast",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -39936,
                -30720
            ],
            [
                43008,
                33792
            ]
        ],
        "continent_rect": [
            [
                38656,
                30848
            ],
            [
                42112,
                33536
            ]
        ],
        "map_name": "A Different Dream"
    },
    "557": {
        "min_level": 30,
        "max_level": 30,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1,
            3,
            2,
            0
        ],
        "region_id": 5,
        "region_name": "Tarnished Coast",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -15360,
                -24576
            ],
            [
                18432,
                24576
            ]
        ],
        "continent_rect": [
            [
                42496,
                36480
            ],
            [
                43904,
                38528
            ]
        ],
        "map_name": "A Splinter in the Flesh"
    },
    "558": {
        "min_level": 20,
        "max_level": 20,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 5,
        "region_name": "Tarnished Coast",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -39936,
                -30720
            ],
            [
                43008,
                33792
            ]
        ],
        "continent_rect": [
            [
                38656,
                30848
            ],
            [
                42112,
                33536
            ]
        ],
        "map_name": "Shadow of the Tree"
    },
    "559": {
        "min_level": 20,
        "max_level": 20,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 5,
        "region_name": "Tarnished Coast",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -39936,
                -30720
            ],
            [
                43008,
                33792
            ]
        ],
        "continent_rect": [
            [
                38656,
                30848
            ],
            [
                42112,
                33536
            ]
        ],
        "map_name": "Eye of the Sun"
    },
    "560": {
        "min_level": 30,
        "max_level": 30,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 4,
        "region_name": "Kryta",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -49152,
                -24576
            ],
            [
                49152,
                24576
            ]
        ],
        "continent_rect": [
            [
                42112,
                30464
            ],
            [
                46208,
                32512
            ]
        ],
        "map_name": "Sharpened Thorns"
    },
    "561": {
        "min_level": 30,
        "max_level": 30,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 4,
        "region_name": "Kryta",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -49152,
                -24576
            ],
            [
                49152,
                24576
            ]
        ],
        "continent_rect": [
            [
                42112,
                30464
            ],
            [
                46208,
                32512
            ]
        ],
        "map_name": "Bramble Walls"
    },
    "563": {
        "min_level": 30,
        "max_level": 30,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 4,
        "region_name": "Kryta",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -49152,
                -24576
            ],
            [
                49152,
                24576
            ]
        ],
        "continent_rect": [
            [
                42112,
                30464
            ],
            [
                46208,
                32512
            ]
        ],
        "map_name": "Secrets in the Earth"
    },
    "564": {
        "min_level": 30,
        "max_level": 30,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 4,
        "region_name": "Kryta",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -39936,
                -30720
            ],
            [
                43008,
                33792
            ]
        ],
        "continent_rect": [
            [
                38656,
                30848
            ],
            [
                42112,
                33536
            ]
        ],
        "map_name": "The Blossom of Youth"
    },
    "566": {
        "min_level": 30,
        "max_level": 30,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 4,
        "region_name": "Kryta",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -49152,
                -24576
            ],
            [
                52224,
                24576
            ]
        ],
        "continent_rect": [
            [
                46208,
                28672
            ],
            [
                50432,
                30720
            ]
        ],
        "map_name": "The Bad Apple"
    },
    "567": {
        "min_level": 30,
        "max_level": 30,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 4,
        "region_name": "Kryta",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -49152,
                -24576
            ],
            [
                52224,
                24576
            ]
        ],
        "continent_rect": [
            [
                46208,
                28672
            ],
            [
                50432,
                30720
            ]
        ],
        "map_name": "Trouble at the Roots"
    },
    "569": {
        "min_level": 30,
        "max_level": 30,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 4,
        "region_name": "Kryta",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -49152,
                -24576
            ],
            [
                52224,
                24576
            ]
        ],
        "continent_rect": [
            [
                46208,
                28672
            ],
            [
                50432,
                30720
            ]
        ],
        "map_name": "Flower of Death"
    },
    "570": {
        "min_level": 30,
        "max_level": 30,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 4,
        "region_name": "Kryta",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -49152,
                -24576
            ],
            [
                52224,
                24576
            ]
        ],
        "continent_rect": [
            [
                46208,
                28672
            ],
            [
                50432,
                30720
            ]
        ],
        "map_name": "Dead of Winter"
    },
    "571": {
        "min_level": 30,
        "max_level": 30,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 4,
        "region_name": "Kryta",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -49152,
                -24576
            ],
            [
                52224,
                24576
            ]
        ],
        "continent_rect": [
            [
                46208,
                28672
            ],
            [
                50432,
                30720
            ]
        ],
        "map_name": "A Tangle of Weeds"
    },
    "573": {
        "min_level": 1,
        "max_level": 1,
        "default_floor": 1,
        "type": "Tutorial",
        "floors": [
            1
        ],
        "region_id": 5,
        "region_name": "Tarnished Coast",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -24576,
                -39936
            ],
            [
                27648,
                39936
            ]
        ],
        "continent_rect": [
            [
                39936,
                33536
            ],
            [
                42112,
                36864
            ]
        ],
        "map_name": "Explosive Intellect"
    },
    "574": {
        "min_level": 10,
        "max_level": 10,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 5,
        "region_name": "Tarnished Coast",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -24576,
                -39936
            ],
            [
                27648,
                39936
            ]
        ],
        "continent_rect": [
            [
                39936,
                33536
            ],
            [
                42112,
                36864
            ]
        ],
        "map_name": "In Snaff's Footsteps"
    },
    "575": {
        "min_level": 10,
        "max_level": 10,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1,
            3,
            2,
            0
        ],
        "region_id": 5,
        "region_name": "Tarnished Coast",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -30720,
                -30720
            ],
            [
                30720,
                30720
            ]
        ],
        "continent_rect": [
            [
                37376,
                36094
            ],
            [
                39936,
                38654
            ]
        ],
        "map_name": "Golem Positioning System"
    },
    "576": {
        "min_level": 10,
        "max_level": 10,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 5,
        "region_name": "Tarnished Coast",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -24576,
                -39936
            ],
            [
                27648,
                39936
            ]
        ],
        "continent_rect": [
            [
                39936,
                33536
            ],
            [
                42112,
                36864
            ]
        ],
        "map_name": "Monkey Wrench"
    },
    "577": {
        "min_level": 10,
        "max_level": 10,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1,
            3,
            2,
            0
        ],
        "region_id": 5,
        "region_name": "Tarnished Coast",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -30720,
                -30720
            ],
            [
                30720,
                30720
            ]
        ],
        "continent_rect": [
            [
                37376,
                36094
            ],
            [
                39936,
                38654
            ]
        ],
        "map_name": "Defusing the Problem"
    },
    "578": {
        "min_level": 10,
        "max_level": 10,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 5,
        "region_name": "Tarnished Coast",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -24576,
                -39936
            ],
            [
                27648,
                39936
            ]
        ],
        "continent_rect": [
            [
                39936,
                33536
            ],
            [
                42112,
                36864
            ]
        ],
        "map_name": "The Things We Do For Love"
    },
    "579": {
        "min_level": 10,
        "max_level": 10,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 5,
        "region_name": "Tarnished Coast",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -24576,
                -39936
            ],
            [
                27648,
                39936
            ]
        ],
        "continent_rect": [
            [
                39936,
                33536
            ],
            [
                42112,
                36864
            ]
        ],
        "map_name": "The Snaff Prize"
    },
    "581": {
        "min_level": 10,
        "max_level": 10,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 5,
        "region_name": "Tarnished Coast",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -24576,
                -39936
            ],
            [
                27648,
                39936
            ]
        ],
        "continent_rect": [
            [
                39936,
                33536
            ],
            [
                42112,
                36864
            ]
        ],
        "map_name": "A Sparkling Rescue"
    },
    "582": {
        "min_level": 10,
        "max_level": 10,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 5,
        "region_name": "Tarnished Coast",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -24576,
                -39936
            ],
            [
                27648,
                39936
            ]
        ],
        "continent_rect": [
            [
                39936,
                33536
            ],
            [
                42112,
                36864
            ]
        ],
        "map_name": "High Maintenance"
    },
    "583": {
        "min_level": 10,
        "max_level": 10,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 5,
        "region_name": "Tarnished Coast",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -24576,
                -39936
            ],
            [
                27648,
                39936
            ]
        ],
        "continent_rect": [
            [
                39936,
                33536
            ],
            [
                42112,
                36864
            ]
        ],
        "map_name": "Snaff Would Be Proud"
    },
    "584": {
        "min_level": 10,
        "max_level": 10,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 5,
        "region_name": "Tarnished Coast",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -24576,
                -39936
            ],
            [
                27648,
                39936
            ]
        ],
        "continent_rect": [
            [
                39936,
                33536
            ],
            [
                42112,
                36864
            ]
        ],
        "map_name": "Taking Credit Back"
    },
    "586": {
        "min_level": 10,
        "max_level": 10,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1,
            3,
            2,
            0
        ],
        "region_id": 5,
        "region_name": "Tarnished Coast",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -30720,
                -30720
            ],
            [
                30720,
                30720
            ]
        ],
        "continent_rect": [
            [
                37376,
                36094
            ],
            [
                39936,
                38654
            ]
        ],
        "map_name": "Political Homicide"
    },
    "587": {
        "min_level": 10,
        "max_level": 10,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 5,
        "region_name": "Tarnished Coast",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -24576,
                -39936
            ],
            [
                27648,
                39936
            ]
        ],
        "continent_rect": [
            [
                39936,
                33536
            ],
            [
                42112,
                36864
            ]
        ],
        "map_name": "Here, There, Everywhere"
    },
    "588": {
        "min_level": 10,
        "max_level": 10,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1,
            3,
            2,
            0
        ],
        "region_id": 5,
        "region_name": "Tarnished Coast",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -30720,
                -30720
            ],
            [
                30720,
                30720
            ]
        ],
        "continent_rect": [
            [
                37376,
                36094
            ],
            [
                39936,
                38654
            ]
        ],
        "map_name": "Piece Negotiations"
    },
    "589": {
        "min_level": 10,
        "max_level": 10,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1,
            3,
            2,
            0
        ],
        "region_id": 5,
        "region_name": "Tarnished Coast",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -30720,
                -30720
            ],
            [
                30720,
                30720
            ]
        ],
        "continent_rect": [
            [
                37376,
                36094
            ],
            [
                39936,
                38654
            ]
        ],
        "map_name": "Readings On the Rise"
    },
    "590": {
        "min_level": 10,
        "max_level": 10,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 5,
        "region_name": "Tarnished Coast",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -24576,
                -39936
            ],
            [
                27648,
                39936
            ]
        ],
        "continent_rect": [
            [
                39936,
                33536
            ],
            [
                42112,
                36864
            ]
        ],
        "map_name": "Snaff Would Be Proud"
    },
    "591": {
        "min_level": 10,
        "max_level": 10,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 5,
        "region_name": "Tarnished Coast",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -24576,
                -39936
            ],
            [
                27648,
                39936
            ]
        ],
        "continent_rect": [
            [
                39936,
                33536
            ],
            [
                42112,
                36864
            ]
        ],
        "map_name": "Readings On the Rise"
    },
    "592": {
        "min_level": 10,
        "max_level": 10,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 5,
        "region_name": "Tarnished Coast",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -24576,
                -39936
            ],
            [
                27648,
                39936
            ]
        ],
        "continent_rect": [
            [
                39936,
                33536
            ],
            [
                42112,
                36864
            ]
        ],
        "map_name": "Unscheduled Delay"
    },
    "594": {
        "min_level": 10,
        "max_level": 10,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 5,
        "region_name": "Tarnished Coast",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -24576,
                -39936
            ],
            [
                27648,
                39936
            ]
        ],
        "continent_rect": [
            [
                39936,
                33536
            ],
            [
                42112,
                36864
            ]
        ],
        "map_name": "Stand By Your Krewe"
    },
    "595": {
        "min_level": 10,
        "max_level": 10,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 5,
        "region_name": "Tarnished Coast",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -24576,
                -39936
            ],
            [
                27648,
                39936
            ]
        ],
        "continent_rect": [
            [
                39936,
                33536
            ],
            [
                42112,
                36864
            ]
        ],
        "map_name": "Unwelcome Visitors"
    },
    "596": {
        "min_level": 20,
        "max_level": 25,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1,
            3,
            2,
            0
        ],
        "region_id": 5,
        "region_name": "Tarnished Coast",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -30720,
                -30720
            ],
            [
                30720,
                30720
            ]
        ],
        "continent_rect": [
            [
                37376,
                36094
            ],
            [
                39936,
                38654
            ]
        ],
        "map_name": "Where Credit Is Due"
    },
    "597": {
        "min_level": 20,
        "max_level": 25,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 5,
        "region_name": "Tarnished Coast",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -24576,
                -39936
            ],
            [
                27648,
                39936
            ]
        ],
        "continent_rect": [
            [
                39936,
                33536
            ],
            [
                42112,
                36864
            ]
        ],
        "map_name": "Where Credit Is Due"
    },
    "598": {
        "min_level": 20,
        "max_level": 25,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 5,
        "region_name": "Tarnished Coast",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -24576,
                -39936
            ],
            [
                27648,
                39936
            ]
        ],
        "continent_rect": [
            [
                39936,
                33536
            ],
            [
                42112,
                36864
            ]
        ],
        "map_name": "Short Fuse"
    },
    "599": {
        "min_level": 20,
        "max_level": 25,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1,
            3,
            2,
            0
        ],
        "region_id": 5,
        "region_name": "Tarnished Coast",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -30720,
                -30720
            ],
            [
                30720,
                30720
            ]
        ],
        "continent_rect": [
            [
                37376,
                36094
            ],
            [
                39936,
                38654
            ]
        ],
        "map_name": "Short Fuse"
    },
    "606": {
        "min_level": 20,
        "max_level": 25,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 5,
        "region_name": "Tarnished Coast",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -24576,
                -39936
            ],
            [
                27648,
                39936
            ]
        ],
        "continent_rect": [
            [
                39936,
                33536
            ],
            [
                42112,
                36864
            ]
        ],
        "map_name": "Salt in the Wound"
    },
    "607": {
        "min_level": 20,
        "max_level": 25,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 5,
        "region_name": "Tarnished Coast",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -39936,
                -30720
            ],
            [
                43008,
                33792
            ]
        ],
        "continent_rect": [
            [
                38656,
                30848
            ],
            [
                42112,
                33536
            ]
        ],
        "map_name": "Free Rein"
    },
    "608": {
        "min_level": 20,
        "max_level": 25,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1,
            3,
            2,
            0
        ],
        "region_id": 5,
        "region_name": "Tarnished Coast",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -30720,
                -30720
            ],
            [
                30720,
                30720
            ]
        ],
        "continent_rect": [
            [
                37376,
                36094
            ],
            [
                39936,
                38654
            ]
        ],
        "map_name": "Serving Up Trouble"
    },
    "609": {
        "min_level": 20,
        "max_level": 25,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 5,
        "region_name": "Tarnished Coast",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -24576,
                -39936
            ],
            [
                27648,
                39936
            ]
        ],
        "continent_rect": [
            [
                39936,
                33536
            ],
            [
                42112,
                36864
            ]
        ],
        "map_name": "Serving Up Trouble"
    },
    "610": {
        "min_level": 20,
        "max_level": 25,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1,
            3,
            2,
            0
        ],
        "region_id": 5,
        "region_name": "Tarnished Coast",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -30720,
                -30720
            ],
            [
                30720,
                30720
            ]
        ],
        "continent_rect": [
            [
                37376,
                36094
            ],
            [
                39936,
                38654
            ]
        ],
        "map_name": "Flash Flood"
    },
    "611": {
        "min_level": 20,
        "max_level": 25,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 5,
        "region_name": "Tarnished Coast",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -39936,
                -30720
            ],
            [
                43008,
                33792
            ]
        ],
        "continent_rect": [
            [
                38656,
                30848
            ],
            [
                42112,
                33536
            ]
        ],
        "map_name": "I Smell a Rat"
    },
    "613": {
        "min_level": 20,
        "max_level": 25,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1,
            3,
            2
        ],
        "region_id": 5,
        "region_name": "Tarnished Coast",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -30720,
                -30720
            ],
            [
                30720,
                30720
            ]
        ],
        "continent_rect": [
            [
                37376,
                36094
            ],
            [
                39936,
                38654
            ]
        ],
        "map_name": "Magnum Opus"
    },
    "614": {
        "min_level": 20,
        "max_level": 25,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1,
            3,
            2,
            0
        ],
        "region_id": 5,
        "region_name": "Tarnished Coast",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -30720,
                -30720
            ],
            [
                30720,
                30720
            ]
        ],
        "continent_rect": [
            [
                37376,
                36094
            ],
            [
                39936,
                38654
            ]
        ],
        "map_name": "Magnum Opus"
    },
    "617": {
        "min_level": 20,
        "max_level": 25,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 5,
        "region_name": "Tarnished Coast",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -39936,
                -30720
            ],
            [
                43008,
                33792
            ]
        ],
        "continent_rect": [
            [
                38656,
                30848
            ],
            [
                42112,
                33536
            ]
        ],
        "map_name": "Bad Business"
    },
    "618": {
        "min_level": 20,
        "max_level": 25,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 5,
        "region_name": "Tarnished Coast",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -39936,
                -30720
            ],
            [
                43008,
                33792
            ]
        ],
        "continent_rect": [
            [
                38656,
                30848
            ],
            [
                42112,
                33536
            ]
        ],
        "map_name": "Beta Test"
    },
    "619": {
        "min_level": 20,
        "max_level": 25,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1,
            3,
            2,
            0
        ],
        "region_id": 5,
        "region_name": "Tarnished Coast",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -30720,
                -30720
            ],
            [
                30720,
                30720
            ]
        ],
        "continent_rect": [
            [
                37376,
                36094
            ],
            [
                39936,
                38654
            ]
        ],
        "map_name": "Beta Test"
    },
    "620": {
        "min_level": 20,
        "max_level": 25,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1,
            3,
            2,
            0
        ],
        "region_id": 5,
        "region_name": "Tarnished Coast",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -30720,
                -30720
            ],
            [
                30720,
                30720
            ]
        ],
        "continent_rect": [
            [
                37376,
                36094
            ],
            [
                39936,
                38654
            ]
        ],
        "map_name": "Any Sufficiently Advanced Science"
    },
    "621": {
        "min_level": 20,
        "max_level": 25,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 5,
        "region_name": "Tarnished Coast",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -24576,
                -39936
            ],
            [
                27648,
                39936
            ]
        ],
        "continent_rect": [
            [
                39936,
                33536
            ],
            [
                42112,
                36864
            ]
        ],
        "map_name": "Any Sufficiently Advanced Science"
    },
    "622": {
        "min_level": 20,
        "max_level": 25,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 5,
        "region_name": "Tarnished Coast",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -39936,
                -30720
            ],
            [
                43008,
                33792
            ]
        ],
        "continent_rect": [
            [
                38656,
                30848
            ],
            [
                42112,
                33536
            ]
        ],
        "map_name": "Bad Forecast"
    },
    "623": {
        "min_level": 20,
        "max_level": 25,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 5,
        "region_name": "Tarnished Coast",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -39936,
                -30720
            ],
            [
                43008,
                33792
            ]
        ],
        "continent_rect": [
            [
                38656,
                30848
            ],
            [
                42112,
                33536
            ]
        ],
        "map_name": "Industrial Espionage"
    },
    "624": {
        "min_level": 20,
        "max_level": 25,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 5,
        "region_name": "Tarnished Coast",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -39936,
                -30720
            ],
            [
                43008,
                33792
            ]
        ],
        "continent_rect": [
            [
                38656,
                30848
            ],
            [
                42112,
                33536
            ]
        ],
        "map_name": "Split Second"
    },
    "625": {
        "min_level": 20,
        "max_level": 25,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1,
            3,
            2,
            0
        ],
        "region_id": 5,
        "region_name": "Tarnished Coast",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -30720,
                -30720
            ],
            [
                30720,
                30720
            ]
        ],
        "continent_rect": [
            [
                37376,
                36094
            ],
            [
                39936,
                38654
            ]
        ],
        "map_name": "Carry a Big Stick"
    },
    "627": {
        "min_level": 40,
        "max_level": 40,
        "default_floor": 43,
        "type": "Instance",
        "floors": [
            43
        ],
        "region_id": 4,
        "region_name": "Kryta",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -27648,
                -18432
            ],
            [
                30720,
                18432
            ]
        ],
        "continent_rect": [
            [
                48000,
                30720
            ],
            [
                50432,
                32256
            ]
        ],
        "map_name": "Meeting my Mentor"
    },
    "628": {
        "min_level": 40,
        "max_level": 40,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 4,
        "region_name": "Kryta",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -49152,
                -24576
            ],
            [
                52224,
                24576
            ]
        ],
        "continent_rect": [
            [
                46208,
                28672
            ],
            [
                50432,
                30720
            ]
        ],
        "map_name": "Stealing Secrets"
    },
    "629": {
        "min_level": 30,
        "max_level": 35,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1,
            3,
            2,
            0
        ],
        "region_id": 5,
        "region_name": "Tarnished Coast",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -30720,
                -30720
            ],
            [
                30720,
                30720
            ]
        ],
        "continent_rect": [
            [
                37376,
                36094
            ],
            [
                39936,
                38654
            ]
        ],
        "map_name": "A Bold New Theory"
    },
    "630": {
        "min_level": 30,
        "max_level": 35,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1,
            3,
            2,
            0
        ],
        "region_id": 5,
        "region_name": "Tarnished Coast",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -30720,
                -30720
            ],
            [
                30720,
                30720
            ]
        ],
        "continent_rect": [
            [
                37376,
                36094
            ],
            [
                39936,
                38654
            ]
        ],
        "map_name": "Forging Permission"
    },
    "631": {
        "min_level": 30,
        "max_level": 35,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1,
            3,
            2,
            0
        ],
        "region_id": 5,
        "region_name": "Tarnished Coast",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -30720,
                -30720
            ],
            [
                30720,
                30720
            ]
        ],
        "continent_rect": [
            [
                37376,
                36094
            ],
            [
                39936,
                38654
            ]
        ],
        "map_name": "Forging Permission"
    },
    "633": {
        "min_level": 40,
        "max_level": 40,
        "default_floor": 43,
        "type": "Instance",
        "floors": [
            43
        ],
        "region_id": 4,
        "region_name": "Kryta",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -27648,
                -18432
            ],
            [
                30720,
                18432
            ]
        ],
        "continent_rect": [
            [
                48000,
                30720
            ],
            [
                50432,
                32256
            ]
        ],
        "map_name": "Setting the Stage"
    },
    "634": {
        "min_level": 40,
        "max_level": 40,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 1,
        "region_name": "Shiverpeak Mountains",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -21504,
                -58368
            ],
            [
                21504,
                58368
            ]
        ],
        "continent_rect": [
            [
                50432,
                29696
            ],
            [
                52224,
                34560
            ]
        ],
        "map_name": "Containment"
    },
    "635": {
        "min_level": 40,
        "max_level": 40,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 1,
        "region_name": "Shiverpeak Mountains",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -21504,
                -58368
            ],
            [
                21504,
                58368
            ]
        ],
        "continent_rect": [
            [
                50432,
                29696
            ],
            [
                52224,
                34560
            ]
        ],
        "map_name": "Containment"
    },
    "636": {
        "min_level": 30,
        "max_level": 35,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1,
            3,
            2,
            0
        ],
        "region_id": 5,
        "region_name": "Tarnished Coast",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -30720,
                -30720
            ],
            [
                30720,
                30720
            ]
        ],
        "continent_rect": [
            [
                37376,
                36094
            ],
            [
                39936,
                38654
            ]
        ],
        "map_name": "Hazardous Environment"
    },
    "638": {
        "min_level": 40,
        "max_level": 40,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 4,
        "region_name": "Kryta",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -49152,
                -24576
            ],
            [
                52224,
                24576
            ]
        ],
        "continent_rect": [
            [
                46208,
                28672
            ],
            [
                50432,
                30720
            ]
        ],
        "map_name": "Down the Hatch"
    },
    "639": {
        "min_level": 40,
        "max_level": 40,
        "default_floor": 43,
        "type": "Instance",
        "floors": [
            43
        ],
        "region_id": 4,
        "region_name": "Kryta",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -27648,
                -18432
            ],
            [
                30720,
                18432
            ]
        ],
        "continent_rect": [
            [
                48000,
                30720
            ],
            [
                50432,
                32256
            ]
        ],
        "map_name": "Down the Hatch"
    },
    "642": {
        "min_level": 40,
        "max_level": 40,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 1,
        "region_name": "Shiverpeak Mountains",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -21504,
                -58368
            ],
            [
                21504,
                58368
            ]
        ],
        "continent_rect": [
            [
                50432,
                29696
            ],
            [
                52224,
                34560
            ]
        ],
        "map_name": "The Stone Sheath"
    },
    "643": {
        "min_level": 40,
        "max_level": 40,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 1,
        "region_name": "Shiverpeak Mountains",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -21504,
                -58368
            ],
            [
                21504,
                58368
            ]
        ],
        "continent_rect": [
            [
                50432,
                29696
            ],
            [
                52224,
                34560
            ]
        ],
        "map_name": "Bad Blood"
    },
    "644": {
        "min_level": 30,
        "max_level": 35,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 5,
        "region_name": "Tarnished Coast",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -39936,
                -30720
            ],
            [
                43008,
                33792
            ]
        ],
        "continent_rect": [
            [
                38656,
                30848
            ],
            [
                42112,
                33536
            ]
        ],
        "map_name": "Test Subject"
    },
    "645": {
        "min_level": 30,
        "max_level": 35,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 5,
        "region_name": "Tarnished Coast",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -49152,
                -24576
            ],
            [
                52224,
                24576
            ]
        ],
        "continent_rect": [
            [
                46208,
                28672
            ],
            [
                50432,
                30720
            ]
        ],
        "map_name": "Field Test"
    },
    "646": {
        "min_level": 0,
        "max_level": 0,
        "default_floor": 3,
        "type": "Instance",
        "floors": [
            1,
            3,
            2,
            0
        ],
        "region_id": 5,
        "region_name": "Tarnished Coast",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -15360,
                -24576
            ],
            [
                18432,
                24576
            ]
        ],
        "continent_rect": [
            [
                42496,
                36480
            ],
            [
                43904,
                38528
            ]
        ],
        "map_name": "The House of Caithe"
    },
    "647": {
        "min_level": 0,
        "max_level": 0,
        "default_floor": 3,
        "type": "Instance",
        "floors": [
            1,
            3,
            2,
            0
        ],
        "region_id": 5,
        "region_name": "Tarnished Coast",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -15360,
                -24576
            ],
            [
                18432,
                24576
            ]
        ],
        "continent_rect": [
            [
                42496,
                36480
            ],
            [
                43904,
                38528
            ]
        ],
        "map_name": "Dreamer's Terrace (Home)"
    },
    "648": {
        "min_level": 0,
        "max_level": 0,
        "default_floor": 2,
        "type": "Instance",
        "floors": [
            1,
            3,
            2,
            0
        ],
        "region_id": 5,
        "region_name": "Tarnished Coast",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -15360,
                -24576
            ],
            [
                18432,
                24576
            ]
        ],
        "continent_rect": [
            [
                42496,
                36480
            ],
            [
                43904,
                38528
            ]
        ],
        "map_name": "The Omphalos Chamber"
    },
    "649": {
        "min_level": 0,
        "max_level": 0,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1,
            3,
            2,
            0
        ],
        "region_id": 5,
        "region_name": "Tarnished Coast",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -30720,
                -30720
            ],
            [
                30720,
                30720
            ]
        ],
        "continent_rect": [
            [
                37376,
                36094
            ],
            [
                39936,
                38654
            ]
        ],
        "map_name": "Snaff Memorial Lab"
    },
    "650": {
        "min_level": 0,
        "max_level": 0,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1,
            3,
            2,
            0
        ],
        "region_id": 5,
        "region_name": "Tarnished Coast",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -30720,
                -30720
            ],
            [
                30720,
                30720
            ]
        ],
        "continent_rect": [
            [
                37376,
                36094
            ],
            [
                39936,
                38654
            ]
        ],
        "map_name": "Applied Development Lab (Home)"
    },
    "651": {
        "min_level": 0,
        "max_level": 0,
        "default_floor": 2,
        "type": "Instance",
        "floors": [
            1,
            3,
            2,
            0
        ],
        "region_id": 5,
        "region_name": "Tarnished Coast",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -30720,
                -30720
            ],
            [
                30720,
                30720
            ]
        ],
        "continent_rect": [
            [
                37376,
                36094
            ],
            [
                39936,
                38654
            ]
        ],
        "map_name": "Council Level"
    },
    "652": {
        "min_level": 30,
        "max_level": 35,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1,
            3,
            2,
            0
        ],
        "region_id": 5,
        "region_name": "Tarnished Coast",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -30720,
                -30720
            ],
            [
                30720,
                30720
            ]
        ],
        "continent_rect": [
            [
                37376,
                36094
            ],
            [
                39936,
                38654
            ]
        ],
        "map_name": "A Meeting of the Minds"
    },
    "653": {
        "min_level": 40,
        "max_level": 40,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 1,
        "region_name": "Shiverpeak Mountains",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -21504,
                -58368
            ],
            [
                21504,
                58368
            ]
        ],
        "continent_rect": [
            [
                50432,
                29696
            ],
            [
                52224,
                34560
            ]
        ],
        "map_name": "Mightier than the Sword"
    },
    "654": {
        "min_level": 40,
        "max_level": 40,
        "default_floor": 43,
        "type": "Instance",
        "floors": [
            43
        ],
        "region_id": 4,
        "region_name": "Kryta",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -27648,
                -18432
            ],
            [
                30720,
                18432
            ]
        ],
        "continent_rect": [
            [
                48000,
                30720
            ],
            [
                50432,
                32256
            ]
        ],
        "map_name": "They Went Thataway"
    },
    "655": {
        "min_level": 30,
        "max_level": 35,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1,
            3,
            2,
            0
        ],
        "region_id": 5,
        "region_name": "Tarnished Coast",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -30720,
                -30720
            ],
            [
                30720,
                30720
            ]
        ],
        "continent_rect": [
            [
                37376,
                36094
            ],
            [
                39936,
                38654
            ]
        ],
        "map_name": "Lines of Communication"
    },
    "656": {
        "min_level": 50,
        "max_level": 50,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 2,
        "region_name": "Ascalon",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -24576,
                -49152
            ],
            [
                24576,
                49152
            ]
        ],
        "continent_rect": [
            [
                61952,
                28544
            ],
            [
                64000,
                32640
            ]
        ],
        "map_name": "Untamed Wilds"
    },
    "657": {
        "min_level": 40,
        "max_level": 40,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 4,
        "region_name": "Kryta",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -27648,
                -36864
            ],
            [
                30720,
                39936
            ]
        ],
        "continent_rect": [
            [
                48000,
                32256
            ],
            [
                50432,
                35456
            ]
        ],
        "map_name": "An Apple a Day"
    },
    "658": {
        "min_level": 40,
        "max_level": 40,
        "default_floor": -3,
        "type": "Instance",
        "floors": [
            -3,
            1
        ],
        "region_id": 4,
        "region_name": "Kryta",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -12288,
                -12288
            ],
            [
                12288,
                12288
            ]
        ],
        "continent_rect": [
            [
                48768,
                32384
            ],
            [
                49792,
                33408
            ]
        ],
        "map_name": "Base of Operations"
    },
    "659": {
        "min_level": 50,
        "max_level": 50,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 2,
        "region_name": "Ascalon",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -24576,
                -49152
            ],
            [
                24576,
                49152
            ]
        ],
        "continent_rect": [
            [
                61952,
                28544
            ],
            [
                64000,
                32640
            ]
        ],
        "map_name": "The Lost Chieftain's Return"
    },
    "660": {
        "min_level": 40,
        "max_level": 40,
        "default_floor": 43,
        "type": "Instance",
        "floors": [
            43
        ],
        "region_id": 4,
        "region_name": "Kryta",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -27648,
                -18432
            ],
            [
                30720,
                18432
            ]
        ],
        "continent_rect": [
            [
                48000,
                30720
            ],
            [
                50432,
                32256
            ]
        ],
        "map_name": "Thrown Off Guard"
    },
    "662": {
        "min_level": 50,
        "max_level": 50,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 2,
        "region_name": "Ascalon",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -24576,
                -49152
            ],
            [
                24576,
                49152
            ]
        ],
        "continent_rect": [
            [
                61952,
                28544
            ],
            [
                64000,
                32640
            ]
        ],
        "map_name": "Pets and Walls Make Stronger Kraals"
    },
    "663": {
        "min_level": 50,
        "max_level": 50,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 1,
        "region_name": "Shiverpeak Mountains",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -27648,
                -36864
            ],
            [
                27648,
                39936
            ]
        ],
        "continent_rect": [
            [
                52224,
                31360
            ],
            [
                54528,
                34560
            ]
        ],
        "map_name": "Doubt"
    },
    "664": {
        "min_level": 50,
        "max_level": 50,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 1,
        "region_name": "Shiverpeak Mountains",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -27648,
                -36864
            ],
            [
                27648,
                39936
            ]
        ],
        "continent_rect": [
            [
                52224,
                31360
            ],
            [
                54528,
                34560
            ]
        ],
        "map_name": "The False God's Lair"
    },
    "666": {
        "min_level": 50,
        "max_level": 50,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 1,
        "region_name": "Shiverpeak Mountains",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -27648,
                -36864
            ],
            [
                27648,
                39936
            ]
        ],
        "continent_rect": [
            [
                52224,
                31360
            ],
            [
                54528,
                34560
            ]
        ],
        "map_name": "Bad Ice"
    },
    "667": {
        "min_level": 50,
        "max_level": 50,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 1,
        "region_name": "Shiverpeak Mountains",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -27648,
                -36864
            ],
            [
                27648,
                39936
            ]
        ],
        "continent_rect": [
            [
                52224,
                31360
            ],
            [
                54528,
                34560
            ]
        ],
        "map_name": "Bad Ice"
    },
    "668": {
        "min_level": 50,
        "max_level": 50,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 2,
        "region_name": "Ascalon",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -24576,
                -49152
            ],
            [
                24576,
                49152
            ]
        ],
        "continent_rect": [
            [
                61952,
                28544
            ],
            [
                64000,
                32640
            ]
        ],
        "map_name": "Pets and Walls Make Stronger Kraals"
    },
    "669": {
        "min_level": 50,
        "max_level": 50,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 1,
        "region_name": "Shiverpeak Mountains",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -27648,
                -36864
            ],
            [
                27648,
                39936
            ]
        ],
        "continent_rect": [
            [
                52224,
                31360
            ],
            [
                54528,
                34560
            ]
        ],
        "map_name": "Attempted Deicide"
    },
    "670": {
        "min_level": 50,
        "max_level": 50,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 1,
        "region_name": "Shiverpeak Mountains",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -27648,
                -36864
            ],
            [
                27648,
                39936
            ]
        ],
        "continent_rect": [
            [
                52224,
                31360
            ],
            [
                54528,
                34560
            ]
        ],
        "map_name": "Doubt"
    },
    "672": {
        "min_level": 50,
        "max_level": 50,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 4,
        "region_name": "Kryta",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -36864,
                -33792
            ],
            [
                39936,
                33792
            ]
        ],
        "continent_rect": [
            [
                46208,
                25856
            ],
            [
                49408,
                28672
            ]
        ],
        "map_name": "Rat-Tastrophe"
    },
    "673": {
        "min_level": 50,
        "max_level": 50,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 1,
        "region_name": "Shiverpeak Mountains",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -27648,
                -36864
            ],
            [
                27648,
                39936
            ]
        ],
        "continent_rect": [
            [
                52224,
                31360
            ],
            [
                54528,
                34560
            ]
        ],
        "map_name": "Salvation Through Heresy"
    },
    "674": {
        "min_level": 50,
        "max_level": 50,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 1,
        "region_name": "Shiverpeak Mountains",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -27648,
                -36864
            ],
            [
                27648,
                39936
            ]
        ],
        "continent_rect": [
            [
                52224,
                31360
            ],
            [
                54528,
                34560
            ]
        ],
        "map_name": "Enraged and Unashamed"
    },
    "675": {
        "min_level": 50,
        "max_level": 50,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 1,
        "region_name": "Shiverpeak Mountains",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -27648,
                -36864
            ],
            [
                27648,
                39936
            ]
        ],
        "continent_rect": [
            [
                52224,
                31360
            ],
            [
                54528,
                34560
            ]
        ],
        "map_name": "Pastkeeper"
    },
    "676": {
        "min_level": 30,
        "max_level": 35,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 4,
        "region_name": "Kryta",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -49152,
                -24576
            ],
            [
                49152,
                24576
            ]
        ],
        "continent_rect": [
            [
                42112,
                30464
            ],
            [
                46208,
                32512
            ]
        ],
        "map_name": "Protest Too Much"
    },
    "677": {
        "min_level": 30,
        "max_level": 35,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 4,
        "region_name": "Kryta",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -49152,
                -24576
            ],
            [
                49152,
                24576
            ]
        ],
        "continent_rect": [
            [
                42112,
                30464
            ],
            [
                46208,
                32512
            ]
        ],
        "map_name": "Prying the Eye Open"
    },
    "678": {
        "min_level": 50,
        "max_level": 50,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 1,
        "region_name": "Shiverpeak Mountains",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -36864,
                -33792
            ],
            [
                39936,
                33792
            ]
        ],
        "continent_rect": [
            [
                46208,
                25856
            ],
            [
                49408,
                28672
            ]
        ],
        "map_name": "The Hatchery"
    },
    "680": {
        "min_level": 50,
        "max_level": 50,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 4,
        "region_name": "Kryta",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -27648,
                -36864
            ],
            [
                30720,
                39936
            ]
        ],
        "continent_rect": [
            [
                48000,
                32256
            ],
            [
                50432,
                35456
            ]
        ],
        "map_name": "Convincing the Faithful"
    },
    "681": {
        "min_level": 50,
        "max_level": 50,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 1,
        "region_name": "Shiverpeak Mountains",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -27648,
                -36864
            ],
            [
                27648,
                39936
            ]
        ],
        "continent_rect": [
            [
                52224,
                31360
            ],
            [
                54528,
                34560
            ]
        ],
        "map_name": "Evacuation"
    },
    "682": {
        "min_level": 50,
        "max_level": 50,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 2,
        "region_name": "Ascalon",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -24576,
                -49152
            ],
            [
                24576,
                49152
            ]
        ],
        "continent_rect": [
            [
                61952,
                28544
            ],
            [
                64000,
                32640
            ]
        ],
        "map_name": "Untamed Wilds"
    },
    "683": {
        "min_level": 50,
        "max_level": 50,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 4,
        "region_name": "Kryta",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -27648,
                -36864
            ],
            [
                30720,
                39936
            ]
        ],
        "continent_rect": [
            [
                48000,
                32256
            ],
            [
                50432,
                35456
            ]
        ],
        "map_name": "Champion's Sacrifice"
    },
    "684": {
        "min_level": 50,
        "max_level": 50,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 4,
        "region_name": "Kryta",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -36864,
                -33792
            ],
            [
                39936,
                33792
            ]
        ],
        "continent_rect": [
            [
                46208,
                25856
            ],
            [
                49408,
                28672
            ]
        ],
        "map_name": "Thieving from Thieves"
    },
    "685": {
        "min_level": 40,
        "max_level": 40,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 4,
        "region_name": "Kryta",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -49152,
                -24576
            ],
            [
                52224,
                24576
            ]
        ],
        "continent_rect": [
            [
                46208,
                28672
            ],
            [
                50432,
                30720
            ]
        ],
        "map_name": "Crusader's Return"
    },
    "686": {
        "min_level": 50,
        "max_level": 50,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 4,
        "region_name": "Kryta",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -27648,
                -36864
            ],
            [
                30720,
                39936
            ]
        ],
        "continent_rect": [
            [
                48000,
                32256
            ],
            [
                50432,
                35456
            ]
        ],
        "map_name": "Unholy Grounds"
    },
    "687": {
        "min_level": 50,
        "max_level": 50,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 4,
        "region_name": "Kryta",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -27648,
                -36864
            ],
            [
                30720,
                39936
            ]
        ],
        "continent_rect": [
            [
                48000,
                32256
            ],
            [
                50432,
                35456
            ]
        ],
        "map_name": "Chosen of the Sun"
    },
    "691": {
        "min_level": 50,
        "max_level": 50,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 4,
        "region_name": "Kryta",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -36864,
                -33792
            ],
            [
                39936,
                33792
            ]
        ],
        "continent_rect": [
            [
                46208,
                25856
            ],
            [
                49408,
                28672
            ]
        ],
        "map_name": "Set to Blow"
    },
    "692": {
        "min_level": 10,
        "max_level": 10,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 5,
        "region_name": "Tarnished Coast",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -24576,
                -39936
            ],
            [
                27648,
                39936
            ]
        ],
        "continent_rect": [
            [
                39936,
                33536
            ],
            [
                42112,
                36864
            ]
        ],
        "map_name": "Gadd's Last Gizmo"
    },
    "693": {
        "min_level": 40,
        "max_level": 40,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 1,
        "region_name": "Shiverpeak Mountains",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -21504,
                -58368
            ],
            [
                21504,
                58368
            ]
        ],
        "continent_rect": [
            [
                50432,
                29696
            ],
            [
                52224,
                34560
            ]
        ],
        "map_name": "Library Science"
    },
    "694": {
        "min_level": 30,
        "max_level": 35,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 4,
        "region_name": "Kryta",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -49152,
                -24576
            ],
            [
                52224,
                24576
            ]
        ],
        "continent_rect": [
            [
                46208,
                28672
            ],
            [
                50432,
                30720
            ]
        ],
        "map_name": "Rakt and Ruin"
    },
    "695": {
        "min_level": 60,
        "max_level": 60,
        "default_floor": -3,
        "type": "Instance",
        "floors": [
            -3
        ],
        "region_id": 4,
        "region_name": "Kryta",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -12288,
                -12288
            ],
            [
                12288,
                12288
            ]
        ],
        "continent_rect": [
            [
                48768,
                32384
            ],
            [
                49792,
                33408
            ]
        ],
        "map_name": "Suspicious Activity"
    },
    "696": {
        "min_level": 60,
        "max_level": 60,
        "default_floor": 43,
        "type": "Instance",
        "floors": [
            43
        ],
        "region_id": 4,
        "region_name": "Kryta",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -27648,
                -18432
            ],
            [
                30720,
                18432
            ]
        ],
        "continent_rect": [
            [
                48000,
                30720
            ],
            [
                50432,
                32256
            ]
        ],
        "map_name": "Reconnaissance"
    },
    "697": {
        "min_level": 60,
        "max_level": 60,
        "default_floor": -3,
        "type": "Instance",
        "floors": [
            -3,
            1
        ],
        "region_id": 4,
        "region_name": "Kryta",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -12288,
                -12288
            ],
            [
                12288,
                12288
            ]
        ],
        "continent_rect": [
            [
                48768,
                32384
            ],
            [
                49792,
                33408
            ]
        ],
        "map_name": "Critical Blowback"
    },
    "698": {
        "min_level": 60,
        "max_level": 60,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 4,
        "region_name": "Kryta",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -18432,
                -18432
            ],
            [
                18432,
                18432
            ]
        ],
        "continent_rect": [
            [
                46720,
                32256
            ],
            [
                48256,
                33792
            ]
        ],
        "map_name": "The Battle of Claw Island"
    },
    "699": {
        "min_level": 60,
        "max_level": 60,
        "default_floor": 43,
        "type": "Instance",
        "floors": [
            43
        ],
        "region_id": 4,
        "region_name": "Kryta",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -27648,
                -18432
            ],
            [
                30720,
                18432
            ]
        ],
        "continent_rect": [
            [
                48000,
                30720
            ],
            [
                50432,
                32256
            ]
        ],
        "map_name": "Suspicious Activity"
    },
    "700": {
        "min_level": 60,
        "max_level": 60,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 1,
        "region_name": "Shiverpeak Mountains",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -21504,
                -58368
            ],
            [
                21504,
                58368
            ]
        ],
        "continent_rect": [
            [
                50432,
                29696
            ],
            [
                52224,
                34560
            ]
        ],
        "map_name": "Priory Library"
    },
    "701": {
        "min_level": 60,
        "max_level": 60,
        "default_floor": 43,
        "type": "Instance",
        "floors": [
            43
        ],
        "region_id": 4,
        "region_name": "Kryta",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -27648,
                -18432
            ],
            [
                30720,
                18432
            ]
        ],
        "continent_rect": [
            [
                48000,
                30720
            ],
            [
                50432,
                32256
            ]
        ],
        "map_name": "On Red Alert"
    },
    "702": {
        "min_level": 60,
        "max_level": 60,
        "default_floor": 43,
        "type": "Instance",
        "floors": [
            43
        ],
        "region_id": 4,
        "region_name": "Kryta",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -27648,
                -18432
            ],
            [
                30720,
                18432
            ]
        ],
        "continent_rect": [
            [
                48000,
                30720
            ],
            [
                50432,
                32256
            ]
        ],
        "map_name": "Forearmed Is Forewarned"
    },
    "703": {
        "min_level": 60,
        "max_level": 60,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 4,
        "region_name": "Kryta",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -49152,
                -24576
            ],
            [
                52224,
                24576
            ]
        ],
        "continent_rect": [
            [
                46208,
                28672
            ],
            [
                50432,
                30720
            ]
        ],
        "map_name": "The Oratory"
    },
    "704": {
        "min_level": 60,
        "max_level": 60,
        "default_floor": 43,
        "type": "Instance",
        "floors": [
            43
        ],
        "region_id": 4,
        "region_name": "Kryta",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -27648,
                -18432
            ],
            [
                30720,
                18432
            ]
        ],
        "continent_rect": [
            [
                48000,
                30720
            ],
            [
                50432,
                32256
            ]
        ],
        "map_name": "Killing Fields"
    },
    "705": {
        "min_level": 60,
        "max_level": 60,
        "default_floor": 43,
        "type": "Instance",
        "floors": [
            43
        ],
        "region_id": 4,
        "region_name": "Kryta",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -27648,
                -18432
            ],
            [
                30720,
                18432
            ]
        ],
        "continent_rect": [
            [
                48000,
                30720
            ],
            [
                50432,
                32256
            ]
        ],
        "map_name": "The Ghost Rite"
    },
    "706": {
        "min_level": 60,
        "max_level": 60,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 1,
        "region_name": "Shiverpeak Mountains",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -27648,
                -36864
            ],
            [
                27648,
                39936
            ]
        ],
        "continent_rect": [
            [
                51712,
                34560
            ],
            [
                54016,
                37760
            ]
        ],
        "map_name": "The Good Fight"
    },
    "707": {
        "min_level": 60,
        "max_level": 60,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 2,
        "region_name": "Ascalon",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -24576,
                -49152
            ],
            [
                24576,
                49152
            ]
        ],
        "continent_rect": [
            [
                59904,
                25856
            ],
            [
                61952,
                29952
            ]
        ],
        "map_name": "Defense Contract"
    },
    "708": {
        "min_level": 60,
        "max_level": 60,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 4,
        "region_name": "Kryta",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -27648,
                -36864
            ],
            [
                30720,
                39936
            ]
        ],
        "continent_rect": [
            [
                48000,
                32256
            ],
            [
                50432,
                35456
            ]
        ],
        "map_name": "Shards of Orr"
    },
    "709": {
        "min_level": 60,
        "max_level": 60,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 1,
        "region_name": "Shiverpeak Mountains",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -27648,
                -36864
            ],
            [
                27648,
                39936
            ]
        ],
        "continent_rect": [
            [
                51712,
                34560
            ],
            [
                54016,
                37760
            ]
        ],
        "map_name": "The Sound of Psi-Lance"
    },
    "710": {
        "min_level": 60,
        "max_level": 60,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 4,
        "region_name": "Kryta",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -43008,
                -27648
            ],
            [
                43008,
                30720
            ]
        ],
        "continent_rect": [
            [
                42624,
                28032
            ],
            [
                46208,
                30464
            ]
        ],
        "map_name": "Early Parole"
    },
    "711": {
        "min_level": 60,
        "max_level": 60,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1,
            3,
            2,
            0
        ],
        "region_id": 5,
        "region_name": "Tarnished Coast",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -30720,
                -30720
            ],
            [
                30720,
                30720
            ]
        ],
        "continent_rect": [
            [
                37376,
                36094
            ],
            [
                39936,
                38654
            ]
        ],
        "map_name": "Magic Sucks"
    },
    "712": {
        "min_level": 60,
        "max_level": 60,
        "default_floor": -16,
        "type": "Instance",
        "floors": [
            1,
            -16,
            3,
            2,
            0
        ],
        "region_id": 5,
        "region_name": "Tarnished Coast",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -33792,
                -24576
            ],
            [
                33792,
                24576
            ]
        ],
        "continent_rect": [
            [
                41088,
                36480
            ],
            [
                43904,
                38528
            ]
        ],
        "map_name": "A Light in the Darkness"
    },
    "713": {
        "min_level": 60,
        "max_level": 60,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 1,
        "region_name": "Shiverpeak Mountains",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -21504,
                -58368
            ],
            [
                21504,
                58368
            ]
        ],
        "continent_rect": [
            [
                50432,
                29696
            ],
            [
                52224,
                34560
            ]
        ],
        "map_name": "The Priory Assailed"
    },
    "714": {
        "min_level": 60,
        "max_level": 60,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 4,
        "region_name": "Kryta",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -49152,
                -24576
            ],
            [
                52224,
                24576
            ]
        ],
        "continent_rect": [
            [
                46208,
                28672
            ],
            [
                50432,
                30720
            ]
        ],
        "map_name": "Under Siege"
    },
    "715": {
        "min_level": 60,
        "max_level": 60,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 4,
        "region_name": "Kryta",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -18432,
                -18432
            ],
            [
                18432,
                18432
            ]
        ],
        "continent_rect": [
            [
                46720,
                32256
            ],
            [
                48256,
                33792
            ]
        ],
        "map_name": "Retribution"
    },
    "716": {
        "min_level": 60,
        "max_level": 60,
        "default_floor": 43,
        "type": "Instance",
        "floors": [
            43
        ],
        "region_id": 4,
        "region_name": "Kryta",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -27648,
                -18432
            ],
            [
                30720,
                18432
            ]
        ],
        "continent_rect": [
            [
                48000,
                30720
            ],
            [
                50432,
                32256
            ]
        ],
        "map_name": "Retribution"
    },
    "719": {
        "min_level": 60,
        "max_level": 60,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 1,
        "region_name": "Shiverpeak Mountains",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -27648,
                -36864
            ],
            [
                27648,
                39936
            ]
        ],
        "continent_rect": [
            [
                51712,
                34560
            ],
            [
                54016,
                37760
            ]
        ],
        "map_name": "The Sound of Psi-Lance"
    },
    "726": {
        "min_level": 70,
        "max_level": 70,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 5,
        "region_name": "Tarnished Coast",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -46080,
                -27648
            ],
            [
                46080,
                30720
            ]
        ],
        "continent_rect": [
            [
                50560,
                37760
            ],
            [
                54400,
                40192
            ]
        ],
        "map_name": "Wet Work"
    },
    "727": {
        "min_level": 70,
        "max_level": 70,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 5,
        "region_name": "Tarnished Coast",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -46080,
                -27648
            ],
            [
                46080,
                30720
            ]
        ],
        "continent_rect": [
            [
                50560,
                37760
            ],
            [
                54400,
                40192
            ]
        ],
        "map_name": "Shell Shock"
    },
    "728": {
        "min_level": 70,
        "max_level": 70,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 5,
        "region_name": "Tarnished Coast",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -46080,
                -27648
            ],
            [
                46080,
                30720
            ]
        ],
        "continent_rect": [
            [
                50560,
                37760
            ],
            [
                54400,
                40192
            ]
        ],
        "map_name": "Volcanic Extraction"
    },
    "729": {
        "min_level": 70,
        "max_level": 70,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 5,
        "region_name": "Tarnished Coast",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -46080,
                -27648
            ],
            [
                46080,
                30720
            ]
        ],
        "continent_rect": [
            [
                50560,
                37760
            ],
            [
                54400,
                40192
            ]
        ],
        "map_name": "Munition Acquisition"
    },
    "730": {
        "min_level": 70,
        "max_level": 70,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 5,
        "region_name": "Tarnished Coast",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -46080,
                -27648
            ],
            [
                46080,
                30720
            ]
        ],
        "continent_rect": [
            [
                50560,
                37760
            ],
            [
                54400,
                40192
            ]
        ],
        "map_name": "To the Core"
    },
    "731": {
        "min_level": 70,
        "max_level": 70,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 3,
        "region_name": "Ruins of Orr",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -39936,
                -33792
            ],
            [
                39936,
                33792
            ]
        ],
        "continent_rect": [
            [
                47232,
                38784
            ],
            [
                50560,
                41600
            ]
        ],
        "map_name": "The Battle of Fort Trinity"
    },
    "732": {
        "min_level": 70,
        "max_level": 70,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 5,
        "region_name": "Tarnished Coast",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -30720,
                -39936
            ],
            [
                30720,
                39936
            ]
        ],
        "continent_rect": [
            [
                48000,
                35456
            ],
            [
                50560,
                38784
            ]
        ],
        "map_name": "Tower Down"
    },
    "733": {
        "min_level": 70,
        "max_level": 70,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 1,
        "region_name": "Shiverpeak Mountains",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -27648,
                -36864
            ],
            [
                27648,
                39936
            ]
        ],
        "continent_rect": [
            [
                51712,
                34560
            ],
            [
                54016,
                37760
            ]
        ],
        "map_name": "Forging the Pact"
    },
    "735": {
        "min_level": 70,
        "max_level": 70,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 5,
        "region_name": "Tarnished Coast",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -46080,
                -27648
            ],
            [
                46080,
                30720
            ]
        ],
        "continent_rect": [
            [
                50560,
                37760
            ],
            [
                54400,
                40192
            ]
        ],
        "map_name": "Willing Captives"
    },
    "736": {
        "min_level": 70,
        "max_level": 70,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 5,
        "region_name": "Tarnished Coast",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -46080,
                -27648
            ],
            [
                46080,
                30720
            ]
        ],
        "continent_rect": [
            [
                50560,
                37760
            ],
            [
                54400,
                40192
            ]
        ],
        "map_name": "Marshaling the Truth"
    },
    "737": {
        "min_level": 70,
        "max_level": 70,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 5,
        "region_name": "Tarnished Coast",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -46080,
                -27648
            ],
            [
                46080,
                30720
            ]
        ],
        "continent_rect": [
            [
                50560,
                37760
            ],
            [
                54400,
                40192
            ]
        ],
        "map_name": "Breaking the Bone Ship"
    },
    "738": {
        "min_level": 70,
        "max_level": 70,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 5,
        "region_name": "Tarnished Coast",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -46080,
                -27648
            ],
            [
                46080,
                30720
            ]
        ],
        "continent_rect": [
            [
                50560,
                37760
            ],
            [
                54400,
                40192
            ]
        ],
        "map_name": "Liberating Apatia"
    },
    "739": {
        "min_level": 70,
        "max_level": 70,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1,
            2
        ],
        "region_id": 1,
        "region_name": "Shiverpeak Mountains",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -27648,
                -18432
            ],
            [
                27648,
                21504
            ]
        ],
        "continent_rect": [
            [
                52224,
                29696
            ],
            [
                54528,
                31360
            ]
        ],
        "map_name": "Liberating Apatia"
    },
    "743": {
        "min_level": 70,
        "max_level": 70,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 2,
        "region_name": "Ascalon",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -39936,
                -33792
            ],
            [
                39936,
                33792
            ]
        ],
        "continent_rect": [
            [
                56576,
                24832
            ],
            [
                59904,
                27648
            ]
        ],
        "map_name": "Fixing the Blame"
    },
    "744": {
        "min_level": 70,
        "max_level": 70,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 3,
        "region_name": "Ruins of Orr",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -39936,
                -33792
            ],
            [
                39936,
                33792
            ]
        ],
        "continent_rect": [
            [
                47232,
                38784
            ],
            [
                50560,
                41600
            ]
        ],
        "map_name": "A Sad Duty"
    },
    "745": {
        "min_level": 70,
        "max_level": 70,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 1,
        "region_name": "Shiverpeak Mountains",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -27648,
                -36864
            ],
            [
                27648,
                39936
            ]
        ],
        "continent_rect": [
            [
                51712,
                34560
            ],
            [
                54016,
                37760
            ]
        ],
        "map_name": "Striking off the Chains"
    },
    "746": {
        "min_level": 70,
        "max_level": 70,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 3,
        "region_name": "Ruins of Orr",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -39936,
                -33792
            ],
            [
                39936,
                33792
            ]
        ],
        "continent_rect": [
            [
                47232,
                38784
            ],
            [
                50560,
                41600
            ]
        ],
        "map_name": "Delivering Justice"
    },
    "747": {
        "min_level": 70,
        "max_level": 70,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 5,
        "region_name": "Tarnished Coast",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -46080,
                -27648
            ],
            [
                46080,
                30720
            ]
        ],
        "continent_rect": [
            [
                50560,
                37760
            ],
            [
                54400,
                40192
            ]
        ],
        "map_name": "Intercepting the Orb"
    },
    "750": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 3,
        "region_name": "Ruins of Orr",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -39936,
                -33792
            ],
            [
                39936,
                33792
            ]
        ],
        "continent_rect": [
            [
                47232,
                38784
            ],
            [
                50560,
                41600
            ]
        ],
        "map_name": "Close the Eye"
    },
    "751": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 3,
        "region_name": "Ruins of Orr",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -39936,
                -33792
            ],
            [
                39936,
                33792
            ]
        ],
        "continent_rect": [
            [
                47232,
                38784
            ],
            [
                50560,
                41600
            ]
        ],
        "map_name": "Through the Looking Glass"
    },
    "758": {
        "min_level": 70,
        "max_level": 70,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 3,
        "region_name": "Ruins of Orr",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -24576,
                -49152
            ],
            [
                24576,
                49152
            ]
        ],
        "continent_rect": [
            [
                42880,
                41600
            ],
            [
                44928,
                45696
            ]
        ],
        "map_name": "The Cathedral of Silence"
    },
    "760": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 3,
        "region_name": "Ruins of Orr",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -49152,
                -24576
            ],
            [
                49152,
                24576
            ]
        ],
        "continent_rect": [
            [
                43136,
                39552
            ],
            [
                47232,
                41600
            ]
        ],
        "map_name": "Starving the Beast"
    },
    "761": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 3,
        "region_name": "Ruins of Orr",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -49152,
                -24576
            ],
            [
                49152,
                24576
            ]
        ],
        "continent_rect": [
            [
                43136,
                39552
            ],
            [
                47232,
                41600
            ]
        ],
        "map_name": "Stealing Light"
    },
    "762": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 3,
        "region_name": "Ruins of Orr",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -49152,
                -24576
            ],
            [
                49152,
                24576
            ]
        ],
        "continent_rect": [
            [
                43136,
                39552
            ],
            [
                47232,
                41600
            ]
        ],
        "map_name": "Hunters and Prey"
    },
    "763": {
        "min_level": 70,
        "max_level": 70,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 3,
        "region_name": "Ruins of Orr",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -24576,
                -49152
            ],
            [
                24576,
                49152
            ]
        ],
        "continent_rect": [
            [
                42880,
                41600
            ],
            [
                44928,
                45696
            ]
        ],
        "map_name": "Romke's Final Voyage"
    },
    "764": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 3,
        "region_name": "Ruins of Orr",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -49152,
                -24576
            ],
            [
                49152,
                24576
            ]
        ],
        "continent_rect": [
            [
                43136,
                39552
            ],
            [
                47232,
                41600
            ]
        ],
        "map_name": "Marching Orders"
    },
    "766": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 3,
        "region_name": "Ruins of Orr",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -49152,
                -24576
            ],
            [
                49152,
                24576
            ]
        ],
        "continent_rect": [
            [
                43136,
                39552
            ],
            [
                47232,
                41600
            ]
        ],
        "map_name": "Air Drop"
    },
    "767": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 3,
        "region_name": "Ruins of Orr",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -49152,
                -24576
            ],
            [
                49152,
                24576
            ]
        ],
        "continent_rect": [
            [
                43136,
                39552
            ],
            [
                47232,
                41600
            ]
        ],
        "map_name": "Estate of Decay"
    },
    "768": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 3,
        "region_name": "Ruins of Orr",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -39936,
                -33792
            ],
            [
                39936,
                33792
            ]
        ],
        "continent_rect": [
            [
                47232,
                38784
            ],
            [
                50560,
                41600
            ]
        ],
        "map_name": "What the Eye Beholds"
    },
    "769": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 3,
        "region_name": "Ruins of Orr",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -49152,
                -24576
            ],
            [
                49152,
                24576
            ]
        ],
        "continent_rect": [
            [
                43136,
                39552
            ],
            [
                47232,
                41600
            ]
        ],
        "map_name": "Conscript the Dead Ships"
    },
    "772": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 3,
        "region_name": "Ruins of Orr",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -49152,
                -24576
            ],
            [
                49152,
                24576
            ]
        ],
        "continent_rect": [
            [
                43136,
                39552
            ],
            [
                47232,
                41600
            ]
        ],
        "map_name": "Ossuary of Unquiet Dead"
    },
    "775": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 3,
        "region_name": "Ruins of Orr",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -39936,
                -33792
            ],
            [
                39936,
                33792
            ]
        ],
        "continent_rect": [
            [
                47232,
                38784
            ],
            [
                50560,
                41600
            ]
        ],
        "map_name": "Temple of the Forgotten God"
    },
    "776": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": -8,
        "type": "Instance",
        "floors": [
            1,
            -8
        ],
        "region_id": 3,
        "region_name": "Ruins of Orr",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -6144,
                -6144
            ],
            [
                9216,
                9216
            ]
        ],
        "continent_rect": [
            [
                48000,
                38912
            ],
            [
                48640,
                39552
            ]
        ],
        "map_name": "Temple of the Forgotten God"
    },
    "777": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 3,
        "region_name": "Ruins of Orr",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -39936,
                -33792
            ],
            [
                39936,
                33792
            ]
        ],
        "continent_rect": [
            [
                47232,
                38784
            ],
            [
                50560,
                41600
            ]
        ],
        "map_name": "Temple of the Forgotten God"
    },
    "778": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 3,
        "region_name": "Ruins of Orr",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -39936,
                -33792
            ],
            [
                39936,
                33792
            ]
        ],
        "continent_rect": [
            [
                47232,
                38784
            ],
            [
                50560,
                41600
            ]
        ],
        "map_name": "Through the Looking Glass"
    },
    "779": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 3,
        "region_name": "Ruins of Orr",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -39936,
                -33792
            ],
            [
                39936,
                33792
            ]
        ],
        "continent_rect": [
            [
                47232,
                38784
            ],
            [
                50560,
                41600
            ]
        ],
        "map_name": "Starving the Beast"
    },
    "780": {
        "min_level": 70,
        "max_level": 70,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 3,
        "region_name": "Ruins of Orr",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -24576,
                -49152
            ],
            [
                24576,
                49152
            ]
        ],
        "continent_rect": [
            [
                42880,
                41600
            ],
            [
                44928,
                45696
            ]
        ],
        "map_name": "Against the Corruption"
    },
    "781": {
        "min_level": 70,
        "max_level": 70,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 3,
        "region_name": "Ruins of Orr",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -24576,
                -49152
            ],
            [
                24576,
                49152
            ]
        ],
        "continent_rect": [
            [
                42880,
                41600
            ],
            [
                44928,
                45696
            ]
        ],
        "map_name": "The Source of Orr"
    },
    "782": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 3,
        "region_name": "Ruins of Orr",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -49152,
                -24576
            ],
            [
                49152,
                24576
            ]
        ],
        "continent_rect": [
            [
                43136,
                39552
            ],
            [
                47232,
                41600
            ]
        ],
        "map_name": "Armor Guard"
    },
    "783": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 3,
        "region_name": "Ruins of Orr",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -24576,
                -49152
            ],
            [
                24576,
                49152
            ]
        ],
        "continent_rect": [
            [
                42880,
                41600
            ],
            [
                44928,
                45696
            ]
        ],
        "map_name": "Blast from the Past"
    },
    "784": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 3,
        "region_name": "Ruins of Orr",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -24576,
                -49152
            ],
            [
                24576,
                49152
            ]
        ],
        "continent_rect": [
            [
                42880,
                41600
            ],
            [
                44928,
                45696
            ]
        ],
        "map_name": "The Steel Tide"
    },
    "785": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 3,
        "region_name": "Ruins of Orr",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -49152,
                -24576
            ],
            [
                49152,
                24576
            ]
        ],
        "continent_rect": [
            [
                43136,
                39552
            ],
            [
                47232,
                41600
            ]
        ],
        "map_name": "Further Into Orr"
    },
    "786": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 3,
        "region_name": "Ruins of Orr",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -24576,
                -49152
            ],
            [
                24576,
                49152
            ]
        ],
        "continent_rect": [
            [
                42880,
                41600
            ],
            [
                44928,
                45696
            ]
        ],
        "map_name": "Ships of the Line"
    },
    "787": {
        "min_level": 70,
        "max_level": 70,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 3,
        "region_name": "Ruins of Orr",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -39936,
                -33792
            ],
            [
                39936,
                33792
            ]
        ],
        "continent_rect": [
            [
                47232,
                38784
            ],
            [
                50560,
                41600
            ]
        ],
        "map_name": "Source of Orr"
    },
    "788": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 3,
        "region_name": "Ruins of Orr",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -39936,
                -33792
            ],
            [
                39936,
                33792
            ]
        ],
        "continent_rect": [
            [
                47232,
                38784
            ],
            [
                50560,
                41600
            ]
        ],
        "map_name": "Victory or Death"
    },
    "789": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 3,
        "region_name": "Ruins of Orr",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -49152,
                -24576
            ],
            [
                49152,
                24576
            ]
        ],
        "continent_rect": [
            [
                43136,
                39552
            ],
            [
                47232,
                41600
            ]
        ],
        "map_name": "A Grisly Shipment"
    },
    "790": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 3,
        "region_name": "Ruins of Orr",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -24576,
                -49152
            ],
            [
                24576,
                49152
            ]
        ],
        "continent_rect": [
            [
                42880,
                41600
            ],
            [
                44928,
                45696
            ]
        ],
        "map_name": "Blast from the Past"
    },
    "792": {
        "min_level": 10,
        "max_level": 10,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 1,
        "region_name": "Shiverpeak Mountains",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -21504,
                -55296
            ],
            [
                21504,
                55296
            ]
        ],
        "continent_rect": [
            [
                54528,
                27648
            ],
            [
                56320,
                32256
            ]
        ],
        "map_name": "A Pup's Illness"
    },
    "793": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 3,
        "region_name": "Ruins of Orr",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -39936,
                -33792
            ],
            [
                39936,
                33792
            ]
        ],
        "continent_rect": [
            [
                47232,
                38784
            ],
            [
                50560,
                41600
            ]
        ],
        "map_name": "Hunters and Prey"
    },
    "795": {
        "min_level": 0,
        "max_level": 0,
        "default_floor": 7,
        "type": "Pvp",
        "floors": [
            1,
            7
        ],
        "region_id": 6,
        "region_name": "Player vs. Player",
        "continent_id": 2,
        "continent_name": "Mists",
        "map_rect": [
            [
                -9216,
                -12288
            ],
            [
                12288,
                15360
            ]
        ],
        "continent_rect": [
            [
                2558,
                8190
            ],
            [
                3454,
                9342
            ]
        ],
        "map_name": "Legacy of the Foefire"
    },
    "796": {
        "min_level": 10,
        "max_level": 10,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 4,
        "region_name": "Kryta",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -43008,
                -27648
            ],
            [
                43008,
                30720
            ]
        ],
        "continent_rect": [
            [
                42624,
                28032
            ],
            [
                46208,
                30464
            ]
        ],
        "map_name": "The Informant"
    },
    "797": {
        "min_level": 20,
        "max_level": 20,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 2,
        "region_name": "Ascalon",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -49152,
                -24576
            ],
            [
                49152,
                24576
            ]
        ],
        "continent_rect": [
            [
                57856,
                29952
            ],
            [
                61952,
                32000
            ]
        ],
        "map_name": "A Traitor's Testimony"
    },
    "799": {
        "min_level": 20,
        "max_level": 20,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 2,
        "region_name": "Ascalon",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -49152,
                -24576
            ],
            [
                49152,
                24576
            ]
        ],
        "continent_rect": [
            [
                57856,
                29952
            ],
            [
                61952,
                32000
            ]
        ],
        "map_name": "Follow the Trail"
    },
    "806": {
        "min_level": 10,
        "max_level": 10,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 5,
        "region_name": "Tarnished Coast",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -21504,
                -46080
            ],
            [
                24576,
                49152
            ]
        ],
        "continent_rect": [
            [
                42112,
                32512
            ],
            [
                44032,
                36480
            ]
        ],
        "map_name": "Awakening"
    },
    "807": {
        "min_level": 0,
        "max_level": 0,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1,
            3,
            2,
            0
        ],
        "region_id": 1,
        "region_name": "Shiverpeak Mountains",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -15360,
                -15360
            ],
            [
                15360,
                15360
            ]
        ],
        "continent_rect": [
            [
                57344,
                21248
            ],
            [
                58624,
                22528
            ]
        ],
        "map_name": "Eye of the North"
    },
    "820": {
        "min_level": 10,
        "max_level": 10,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1,
            3,
            2,
            0
        ],
        "region_id": 5,
        "region_name": "Tarnished Coast",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -15360,
                -24576
            ],
            [
                18432,
                24576
            ]
        ],
        "continent_rect": [
            [
                42496,
                36480
            ],
            [
                43904,
                38528
            ]
        ],
        "map_name": "The Omphalos Chamber"
    },
    "821": {
        "min_level": 10,
        "max_level": 10,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1,
            3,
            2,
            0
        ],
        "region_id": 5,
        "region_name": "Tarnished Coast",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -15360,
                -24576
            ],
            [
                18432,
                24576
            ]
        ],
        "continent_rect": [
            [
                42496,
                36480
            ],
            [
                43904,
                38528
            ]
        ],
        "map_name": "The Omphalos Chamber"
    },
    "825": {
        "min_level": 30,
        "max_level": 30,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 4,
        "region_name": "Kryta",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -49152,
                -24576
            ],
            [
                52224,
                24576
            ]
        ],
        "continent_rect": [
            [
                46208,
                28672
            ],
            [
                50432,
                30720
            ]
        ],
        "map_name": "Codebreaker"
    },
    "827": {
        "min_level": 70,
        "max_level": 70,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1,
            3,
            2,
            0
        ],
        "region_id": 3,
        "region_name": "Ruins of Orr",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -39936,
                -33792
            ],
            [
                39936,
                33792
            ]
        ],
        "continent_rect": [
            [
                47232,
                38784
            ],
            [
                50560,
                41600
            ]
        ],
        "map_name": "Caer Aval"
    },
    "828": {
        "min_level": 0,
        "max_level": 0,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 1,
        "region_name": "Shiverpeak Mountains",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -21504,
                -58368
            ],
            [
                21504,
                58368
            ]
        ],
        "continent_rect": [
            [
                50432,
                29696
            ],
            [
                52224,
                34560
            ]
        ],
        "map_name": "The Durmand Priory"
    },
    "830": {
        "min_level": 0,
        "max_level": 0,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 4,
        "region_name": "Kryta",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -49152,
                -24576
            ],
            [
                52224,
                24576
            ]
        ],
        "continent_rect": [
            [
                46208,
                28672
            ],
            [
                50432,
                30720
            ]
        ],
        "map_name": "Vigil Headquarters"
    },
    "833": {
        "min_level": 0,
        "max_level": 0,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1,
            3,
            2
        ],
        "region_id": 2,
        "region_name": "Ascalon",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -18432,
                -24576
            ],
            [
                18432,
                24576
            ]
        ],
        "continent_rect": [
            [
                56320,
                29952
            ],
            [
                57856,
                32000
            ]
        ],
        "map_name": "Ash Tribune Quarters"
    },
    "845": {
        "min_level": 20,
        "max_level": 20,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1,
            2
        ],
        "region_id": 5,
        "region_name": "Tarnished Coast",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -15360,
                -24576
            ],
            [
                18432,
                24576
            ]
        ],
        "continent_rect": [
            [
                42496,
                36480
            ],
            [
                43904,
                38528
            ]
        ],
        "map_name": "Shattered Light"
    },
    "862": {
        "min_level": 0,
        "max_level": 0,
        "default_floor": -32,
        "type": "Pvp",
        "floors": [
            -32,
            -27
        ],
        "region_id": 25,
        "region_name": "Mad King's Realm",
        "continent_id": 2,
        "continent_name": "Mists",
        "map_rect": [
            [
                -9216,
                -9216
            ],
            [
                9216,
                9216
            ]
        ],
        "continent_rect": [
            [
                2944,
                13440
            ],
            [
                3712,
                14208
            ]
        ],
        "map_name": "Reaper's Rumble"
    },
    "863": {
        "min_level": 2,
        "max_level": 80,
        "default_floor": -28,
        "type": "Instance",
        "floors": [
            -28,
            -27
        ],
        "region_id": 25,
        "region_name": "Mad King's Realm",
        "continent_id": 2,
        "continent_name": "Mists",
        "map_rect": [
            [
                -9216,
                -9216
            ],
            [
                9216,
                9216
            ]
        ],
        "continent_rect": [
            [
                2688,
                14208
            ],
            [
                3456,
                14976
            ]
        ],
        "map_name": "Ascent to Madness"
    },
    "864": {
        "min_level": 0,
        "max_level": 0,
        "default_floor": -33,
        "type": "Pvp",
        "floors": [
            -33
        ],
        "region_id": 25,
        "region_name": "Mad King's Realm",
        "continent_id": 2,
        "continent_name": "Mists",
        "map_rect": [
            [
                -9216,
                -9216
            ],
            [
                9216,
                9216
            ]
        ],
        "continent_rect": [
            [
                1792,
                13696
            ],
            [
                2560,
                14464
            ]
        ],
        "map_name": "Lunatic Inquisition"
    },
    "865": {
        "min_level": 0,
        "max_level": 80,
        "default_floor": -30,
        "type": "Pvp",
        "floors": [
            -29,
            -31,
            -30,
            -27
        ],
        "region_id": 25,
        "region_name": "Mad King's Realm",
        "continent_id": 2,
        "continent_name": "Mists",
        "map_rect": [
            [
                -9216,
                -9216
            ],
            [
                9216,
                9216
            ]
        ],
        "continent_rect": [
            [
                1408,
                12544
            ],
            [
                2176,
                13312
            ]
        ],
        "map_name": "Mad King's Clock Tower"
    },
    "866": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": -27,
        "type": "Public",
        "floors": [
            -27
        ],
        "region_id": 25,
        "region_name": "Mad King's Realm",
        "continent_id": 2,
        "continent_name": "Mists",
        "map_rect": [
            [
                -9216,
                -9216
            ],
            [
                9216,
                9216
            ]
        ],
        "continent_rect": [
            [
                1792,
                13696
            ],
            [
                2560,
                14464
            ]
        ],
        "map_name": "Mad King's Labyrinth"
    },
    "872": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 10,
        "type": "Instance",
        "floors": [
            10
        ],
        "region_id": 26,
        "region_name": "Fractals of the Mists",
        "continent_id": 2,
        "continent_name": "Mists",
        "map_rect": [
            [
                -9216,
                -9216
            ],
            [
                12288,
                12288
            ]
        ],
        "continent_rect": [
            [
                11716,
                4346
            ],
            [
                12612,
                5242
            ]
        ],
        "map_name": "Fractals of the Mists"
    },
    "873": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Public",
        "floors": [
            1,
            3,
            2,
            0
        ],
        "region_id": 4,
        "region_name": "Kryta",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -30720,
                -21504
            ],
            [
                33792,
                21504
            ]
        ],
        "continent_rect": [
            [
                44288,
                35328
            ],
            [
                46976,
                37120
            ]
        ],
        "map_name": "Southsun Cove"
    },
    "875": {
        "min_level": 0,
        "max_level": 0,
        "default_floor": 9,
        "type": "Pvp",
        "floors": [
            1,
            9
        ],
        "region_id": 6,
        "region_name": "Player vs. Player",
        "continent_id": 2,
        "continent_name": "Mists",
        "map_rect": [
            [
                -12288,
                -6144
            ],
            [
                12288,
                9216
            ]
        ],
        "continent_rect": [
            [
                4096,
                9344
            ],
            [
                5120,
                9984
            ]
        ],
        "map_name": "Temple of the Silent Storm"
    },
    "877": {
        "min_level": 0,
        "max_level": 0,
        "default_floor": 12,
        "type": "Pvp",
        "floors": [
            12
        ],
        "region_id": 27,
        "region_name": "Wintersday Celebration",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -9216,
                -9216
            ],
            [
                9216,
                9216
            ]
        ],
        "continent_rect": [
            [
                41008,
                26740
            ],
            [
                41776,
                27508
            ]
        ],
        "map_name": "Snowball Mayhem"
    },
    "878": {
        "min_level": 2,
        "max_level": 80,
        "default_floor": 13,
        "type": "Instance",
        "floors": [
            13
        ],
        "region_id": 27,
        "region_name": "Wintersday Celebration",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -9216,
                -9216
            ],
            [
                9216,
                9216
            ]
        ],
        "continent_rect": [
            [
                43008,
                26740
            ],
            [
                43776,
                27508
            ]
        ],
        "map_name": "Tixx's Infinirarium"
    },
    "880": {
        "min_level": 0,
        "max_level": 80,
        "default_floor": 14,
        "type": "Pvp",
        "floors": [
            14
        ],
        "region_id": 27,
        "region_name": "Wintersday Celebration",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -9216,
                -9216
            ],
            [
                9216,
                9216
            ]
        ],
        "continent_rect": [
            [
                43008,
                26740
            ],
            [
                43776,
                27508
            ]
        ],
        "map_name": "Toypocalypse"
    },
    "881": {
        "min_level": 0,
        "max_level": 0,
        "default_floor": 15,
        "type": "Pvp",
        "floors": [
            15
        ],
        "region_id": 27,
        "region_name": "Wintersday Celebration",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -9216,
                -9216
            ],
            [
                9216,
                9216
            ]
        ],
        "continent_rect": [
            [
                41008,
                26740
            ],
            [
                41776,
                27508
            ]
        ],
        "map_name": "Bell Choir Ensemble"
    },
    "882": {
        "min_level": 0,
        "max_level": 80,
        "default_floor": 16,
        "type": "Pvp",
        "floors": [
            16
        ],
        "region_id": 27,
        "region_name": "Wintersday Celebration",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -9216,
                -9216
            ],
            [
                9216,
                9216
            ]
        ],
        "continent_rect": [
            [
                41008,
                26740
            ],
            [
                41776,
                27508
            ]
        ],
        "map_name": "Winter Wonderland"
    },
    "894": {
        "min_level": 0,
        "max_level": 0,
        "default_floor": 26,
        "type": "Pvp",
        "floors": [
            1,
            26
        ],
        "region_id": 6,
        "region_name": "Player vs. Player",
        "continent_id": 2,
        "continent_name": "Mists",
        "map_rect": [
            [
                -12288,
                -12288
            ],
            [
                12288,
                12288
            ]
        ],
        "continent_rect": [
            [
                1920,
                5248
            ],
            [
                2944,
                6272
            ]
        ],
        "map_name": "Spirit Watch"
    },
    "895": {
        "min_level": 1,
        "max_level": 80,
        "default_floor": 21,
        "type": "Instance",
        "floors": [
            23,
            25,
            24,
            22,
            21
        ],
        "region_id": 29,
        "region_name": "Super Adventure Box",
        "continent_id": 2,
        "continent_name": "Mists",
        "map_rect": [
            [
                -61440,
                -21504
            ],
            [
                61440,
                21504
            ]
        ],
        "continent_rect": [
            [
                2176,
                7296
            ],
            [
                3456,
                9856
            ]
        ],
        "map_name": "Super Adventure Box"
    },
    "896": {
        "min_level": 0,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 2,
        "region_name": "Ascalon",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -43008,
                -27648
            ],
            [
                43008,
                27648
            ]
        ],
        "continent_rect": [
            [
                56320,
                27648
            ],
            [
                59904,
                29952
            ]
        ],
        "map_name": "North Nolan Hatchery"
    },
    "897": {
        "min_level": 0,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 1,
        "region_name": "Shiverpeak Mountains",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -30720,
                -30720
            ],
            [
                30720,
                30720
            ]
        ],
        "continent_rect": [
            [
                55296,
                26368
            ],
            [
                57856,
                28928
            ]
        ],
        "map_name": "Cragstead"
    },
    "899": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 3,
        "type": "JumpPuzzle",
        "floors": [
            3
        ],
        "region_id": 7,
        "region_name": "World vs. World",
        "continent_id": 2,
        "continent_name": "Mists",
        "map_rect": [
            [
                -36864,
                -36864
            ],
            [
                36864,
                36864
            ]
        ],
        "continent_rect": [
            [
                8958,
                12798
            ],
            [
                12030,
                15870
            ]
        ],
        "map_name": "Obsidian Sanctum"
    },
    "900": {
        "min_level": 0,
        "max_level": 0,
        "default_floor": 27,
        "type": "Pvp",
        "floors": [
            1,
            27
        ],
        "region_id": 6,
        "region_name": "Player vs. Player",
        "continent_id": 2,
        "continent_name": "Mists",
        "map_rect": [
            [
                -12288,
                -6144
            ],
            [
                12288,
                9216
            ]
        ],
        "continent_rect": [
            [
                7168,
                7422
            ],
            [
                8192,
                8062
            ]
        ],
        "map_name": "Skyhammer"
    },
    "905": {
        "min_level": 0,
        "max_level": 0,
        "default_floor": 1,
        "type": "Pvp",
        "floors": [
            1,
            0
        ],
        "region_id": 4,
        "region_name": "Kryta",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -30720,
                -21504
            ],
            [
                33792,
                21504
            ]
        ],
        "continent_rect": [
            [
                44288,
                35328
            ],
            [
                46976,
                37120
            ]
        ],
        "map_name": "Crab Toss"
    },
    "911": {
        "min_level": 0,
        "max_level": 0,
        "default_floor": 26,
        "type": "Pvp",
        "floors": [
            26
        ],
        "region_id": 4,
        "region_name": "Kryta",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -12288,
                -12288
            ],
            [
                12288,
                12288
            ]
        ],
        "continent_rect": [
            [
                48512,
                30592
            ],
            [
                49536,
                31616
            ]
        ],
        "map_name": "Dragon Ball Arena"
    },
    "914": {
        "min_level": 1,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1,
            2
        ],
        "region_id": 4,
        "region_name": "Kryta",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -21504,
                -21504
            ],
            [
                24576,
                21504
            ]
        ],
        "continent_rect": [
            [
                43008,
                26240
            ],
            [
                44928,
                28032
            ]
        ],
        "map_name": "The Dead End"
    },
    "918": {
        "min_level": 0,
        "max_level": 80,
        "default_floor": 36,
        "type": "Pvp",
        "floors": [
            36
        ],
        "region_id": 5,
        "region_name": "Tarnished Coast",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -12288,
                -12288
            ],
            [
                12288,
                12288
            ]
        ],
        "continent_rect": [
            [
                33280,
                16896
            ],
            [
                34304,
                17920
            ]
        ],
        "map_name": "Aspect Arena"
    },
    "919": {
        "min_level": 0,
        "max_level": 0,
        "default_floor": 34,
        "type": "Pvp",
        "floors": [
            34
        ],
        "region_id": 5,
        "region_name": "Tarnished Coast",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -12288,
                -12288
            ],
            [
                12288,
                12288
            ]
        ],
        "continent_rect": [
            [
                55552,
                38654
            ],
            [
                56576,
                39678
            ]
        ],
        "map_name": "Sanctum Sprint"
    },
    "920": {
        "min_level": 0,
        "max_level": 0,
        "default_floor": 37,
        "type": "Pvp",
        "floors": [
            37
        ],
        "region_id": 9,
        "region_name": "Sea of Sorrows",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -30720,
                -21504
            ],
            [
                33792,
                21504
            ]
        ],
        "continent_rect": [
            [
                44288,
                35328
            ],
            [
                46976,
                37120
            ]
        ],
        "map_name": "Southsun Survival"
    },
    "922": {
        "min_level": 1,
        "max_level": 80,
        "default_floor": 1,
        "type": "Public",
        "floors": [
            1
        ],
        "region_id": 5,
        "region_name": "Tarnished Coast",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -18432,
                -18432
            ],
            [
                18432,
                18432
            ]
        ],
        "continent_rect": [
            [
                54958,
                38648
            ],
            [
                56494,
                40184
            ]
        ],
        "map_name": "Labyrinthine Cliffs"
    },
    "924": {
        "min_level": 1,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 4,
        "region_name": "Kryta",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -49152,
                -24576
            ],
            [
                52224,
                24576
            ]
        ],
        "continent_rect": [
            [
                46208,
                28672
            ],
            [
                50432,
                30720
            ]
        ],
        "map_name": "Grandmaster of Om"
    },
    "929": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 38,
        "type": "Public",
        "floors": [
            38
        ],
        "region_id": 4,
        "region_name": "Kryta",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -9216,
                -9216
            ],
            [
                9216,
                9216
            ]
        ],
        "continent_rect": [
            [
                43034,
                26880
            ],
            [
                43802,
                27648
            ]
        ],
        "map_name": "The Crown Pavilion"
    },
    "934": {
        "min_level": 1,
        "max_level": 80,
        "default_floor": 28,
        "type": "Instance",
        "floors": [
            29,
            28,
            42
        ],
        "region_id": 29,
        "region_name": "Super Adventure Box",
        "continent_id": 2,
        "continent_name": "Mists",
        "map_rect": [
            [
                -30720,
                -30720
            ],
            [
                30720,
                30720
            ]
        ],
        "continent_rect": [
            [
                4290,
                5120
            ],
            [
                5570,
                7680
            ]
        ],
        "map_name": "Super Adventure Box"
    },
    "935": {
        "min_level": 1,
        "max_level": 80,
        "default_floor": 20,
        "type": "Public",
        "floors": [
            20
        ],
        "region_id": 29,
        "region_name": "Super Adventure Box",
        "continent_id": 2,
        "continent_name": "Mists",
        "map_rect": [
            [
                -15360,
                -30720
            ],
            [
                15360,
                30720
            ]
        ],
        "continent_rect": [
            [
                1574,
                5972
            ],
            [
                2854,
                8532
            ]
        ],
        "map_name": "Super Adventure Box"
    },
    "943": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 40,
        "type": "Public",
        "floors": [
            40
        ],
        "region_id": 4,
        "region_name": "Kryta",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -49152,
                -24576
            ],
            [
                49152,
                24576
            ]
        ],
        "continent_rect": [
            [
                41344,
                30336
            ],
            [
                45440,
                32384
            ]
        ],
        "map_name": "Tower of Nightmares"
    },
    "947": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 23,
        "type": "Instance",
        "floors": [
            23
        ],
        "region_id": 26,
        "region_name": "Fractals of the Mists",
        "continent_id": 2,
        "continent_name": "Mists",
        "map_rect": [
            [
                -36864,
                -36864
            ],
            [
                36864,
                36864
            ]
        ],
        "continent_rect": [
            [
                10880,
                3328
            ],
            [
                13952,
                6400
            ]
        ],
        "map_name": "Fractals of the Mists"
    },
    "948": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 19,
        "type": "Instance",
        "floors": [
            19
        ],
        "region_id": 26,
        "region_name": "Fractals of the Mists",
        "continent_id": 2,
        "continent_name": "Mists",
        "map_rect": [
            [
                -9216,
                -9216
            ],
            [
                9216,
                9216
            ]
        ],
        "continent_rect": [
            [
                11804,
                4414
            ],
            [
                12572,
                5182
            ]
        ],
        "map_name": "Fractals of the Mists"
    },
    "949": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 21,
        "type": "Instance",
        "floors": [
            21
        ],
        "region_id": 26,
        "region_name": "Fractals of the Mists",
        "continent_id": 2,
        "continent_name": "Mists",
        "map_rect": [
            [
                -9216,
                -9216
            ],
            [
                9216,
                9216
            ]
        ],
        "continent_rect": [
            [
                11804,
                4414
            ],
            [
                12572,
                5182
            ]
        ],
        "map_name": "Fractals of the Mists"
    },
    "950": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 13,
        "type": "Instance",
        "floors": [
            13
        ],
        "region_id": 26,
        "region_name": "Fractals of the Mists",
        "continent_id": 2,
        "continent_name": "Mists",
        "map_rect": [
            [
                -36864,
                -36864
            ],
            [
                36864,
                36864
            ]
        ],
        "continent_rect": [
            [
                10880,
                3328
            ],
            [
                13952,
                6400
            ]
        ],
        "map_name": "Fractals of the Mists"
    },
    "951": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 24,
        "type": "Instance",
        "floors": [
            24
        ],
        "region_id": 26,
        "region_name": "Fractals of the Mists",
        "continent_id": 2,
        "continent_name": "Mists",
        "map_rect": [
            [
                -9216,
                -9216
            ],
            [
                9216,
                9216
            ]
        ],
        "continent_rect": [
            [
                10880,
                3328
            ],
            [
                11648,
                4096
            ]
        ],
        "map_name": "Fractals of the Mists"
    },
    "952": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 22,
        "type": "Instance",
        "floors": [
            22
        ],
        "region_id": 26,
        "region_name": "Fractals of the Mists",
        "continent_id": 2,
        "continent_name": "Mists",
        "map_rect": [
            [
                -9216,
                -9216
            ],
            [
                9216,
                9216
            ]
        ],
        "continent_rect": [
            [
                11804,
                4414
            ],
            [
                12572,
                5182
            ]
        ],
        "map_name": "Fractals of the Mists"
    },
    "953": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 18,
        "type": "Instance",
        "floors": [
            18
        ],
        "region_id": 26,
        "region_name": "Fractals of the Mists",
        "continent_id": 2,
        "continent_name": "Mists",
        "map_rect": [
            [
                -36864,
                -36864
            ],
            [
                36864,
                36864
            ]
        ],
        "continent_rect": [
            [
                10880,
                3328
            ],
            [
                13952,
                6400
            ]
        ],
        "map_name": "Fractals of the Mists"
    },
    "954": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 25,
        "type": "Instance",
        "floors": [
            25
        ],
        "region_id": 26,
        "region_name": "Fractals of the Mists",
        "continent_id": 2,
        "continent_name": "Mists",
        "map_rect": [
            [
                -36864,
                -36864
            ],
            [
                36864,
                36864
            ]
        ],
        "continent_rect": [
            [
                10880,
                3328
            ],
            [
                13952,
                6400
            ]
        ],
        "map_name": "Fractals of the Mists"
    },
    "955": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 29,
        "type": "Instance",
        "floors": [
            29
        ],
        "region_id": 26,
        "region_name": "Fractals of the Mists",
        "continent_id": 2,
        "continent_name": "Mists",
        "map_rect": [
            [
                -12288,
                -9216
            ],
            [
                12288,
                9216
            ]
        ],
        "continent_rect": [
            [
                11690,
                4414
            ],
            [
                12714,
                5182
            ]
        ],
        "map_name": "Fractals of the Mists"
    },
    "956": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 28,
        "type": "Instance",
        "floors": [
            28
        ],
        "region_id": 26,
        "region_name": "Fractals of the Mists",
        "continent_id": 2,
        "continent_name": "Mists",
        "map_rect": [
            [
                -6144,
                -9216
            ],
            [
                6144,
                9216
            ]
        ],
        "continent_rect": [
            [
                11970,
                4414
            ],
            [
                12482,
                5182
            ]
        ],
        "map_name": "Fractals of the Mists"
    },
    "957": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 30,
        "type": "Instance",
        "floors": [
            30
        ],
        "region_id": 26,
        "region_name": "Fractals of the Mists",
        "continent_id": 2,
        "continent_name": "Mists",
        "map_rect": [
            [
                -9216,
                -9216
            ],
            [
                9216,
                9216
            ]
        ],
        "continent_rect": [
            [
                11804,
                4414
            ],
            [
                12572,
                5182
            ]
        ],
        "map_name": "Fractals of the Mists"
    },
    "958": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 14,
        "type": "Instance",
        "floors": [
            14
        ],
        "region_id": 26,
        "region_name": "Fractals of the Mists",
        "continent_id": 2,
        "continent_name": "Mists",
        "map_rect": [
            [
                -36864,
                -36864
            ],
            [
                36864,
                36864
            ]
        ],
        "continent_rect": [
            [
                10880,
                3328
            ],
            [
                13952,
                6400
            ]
        ],
        "map_name": "Fractals of the Mists"
    },
    "959": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 29,
        "type": "Instance",
        "floors": [
            29
        ],
        "region_id": 26,
        "region_name": "Fractals of the Mists",
        "continent_id": 2,
        "continent_name": "Mists",
        "map_rect": [
            [
                -12288,
                -9216
            ],
            [
                12288,
                9216
            ]
        ],
        "continent_rect": [
            [
                11690,
                4414
            ],
            [
                12714,
                5182
            ]
        ],
        "map_name": "Fractals of the Mists"
    },
    "960": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 28,
        "type": "Instance",
        "floors": [
            28
        ],
        "region_id": 26,
        "region_name": "Fractals of the Mists",
        "continent_id": 2,
        "continent_name": "Mists",
        "map_rect": [
            [
                -6144,
                -9216
            ],
            [
                6144,
                9216
            ]
        ],
        "continent_rect": [
            [
                11970,
                4414
            ],
            [
                12482,
                5182
            ]
        ],
        "map_name": "Fractals of the Mists"
    },
    "964": {
        "min_level": 1,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 1,
        "region_name": "Shiverpeak Mountains",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -21504,
                -58368
            ],
            [
                21504,
                58368
            ]
        ],
        "continent_rect": [
            [
                50432,
                29696
            ],
            [
                52224,
                34560
            ]
        ],
        "map_name": "Scarlet's Secret Lair"
    },
    "968": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 3,
        "type": "EdgeOfTheMists",
        "floors": [
            1,
            3
        ],
        "region_id": 7,
        "region_name": "World vs. World",
        "continent_id": 2,
        "continent_name": "Mists",
        "map_rect": [
            [
                -36864,
                -36864
            ],
            [
                36864,
                36864
            ]
        ],
        "continent_rect": [
            [
                5994,
                8446
            ],
            [
                9066,
                11518
            ]
        ],
        "map_name": "Edge of the Mists"
    },
    "984": {
        "min_level": 0,
        "max_level": 0,
        "default_floor": 32,
        "type": "Pvp",
        "floors": [
            1,
            32
        ],
        "region_id": 6,
        "region_name": "Player vs. Player",
        "continent_id": 2,
        "continent_name": "Mists",
        "map_rect": [
            [
                -12288,
                -12288
            ],
            [
                12288,
                12288
            ]
        ],
        "continent_rect": [
            [
                2048,
                7040
            ],
            [
                3072,
                8064
            ]
        ],
        "map_name": "Courtyard"
    },
    "988": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Public",
        "floors": [
            1,
            3,
            2,
            0
        ],
        "region_id": 11,
        "region_name": "Maguuma Wastes",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -24576,
                -30720
            ],
            [
                24576,
                30720
            ]
        ],
        "continent_rect": [
            [
                36608,
                30976
            ],
            [
                38656,
                33536
            ]
        ],
        "map_name": "Dry Top"
    },
    "989": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 11,
        "region_name": "Maguuma Wastes",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -24576,
                -30720
            ],
            [
                24576,
                30720
            ]
        ],
        "continent_rect": [
            [
                36608,
                30976
            ],
            [
                38656,
                33536
            ]
        ],
        "map_name": "Prosperity's Mystery"
    },
    "990": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 11,
        "region_name": "Maguuma Wastes",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -24576,
                -30720
            ],
            [
                24576,
                30720
            ]
        ],
        "continent_rect": [
            [
                36608,
                30976
            ],
            [
                38656,
                33536
            ]
        ],
        "map_name": "Cornered"
    },
    "991": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 5,
        "region_name": "Tarnished Coast",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -39936,
                -30720
            ],
            [
                43008,
                33792
            ]
        ],
        "continent_rect": [
            [
                38656,
                30848
            ],
            [
                42112,
                33536
            ]
        ],
        "map_name": "Disturbance in Brisban Wildlands"
    },
    "992": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 11,
        "region_name": "Maguuma Wastes",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -24576,
                -30720
            ],
            [
                24576,
                30720
            ]
        ],
        "continent_rect": [
            [
                36608,
                30976
            ],
            [
                38656,
                33536
            ]
        ],
        "map_name": "Fallen Hopes"
    },
    "993": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 11,
        "region_name": "Maguuma Wastes",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -24576,
                -30720
            ],
            [
                24576,
                30720
            ]
        ],
        "continent_rect": [
            [
                36608,
                30976
            ],
            [
                38656,
                33536
            ]
        ],
        "map_name": "Scarlet's Secret Room"
    },
    "994": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 1,
        "region_name": "Shiverpeak Mountains",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -27648,
                -36864
            ],
            [
                27648,
                39936
            ]
        ],
        "continent_rect": [
            [
                51712,
                34560
            ],
            [
                54016,
                37760
            ]
        ],
        "map_name": "The Concordia Incident"
    },
    "997": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "map_rect": [
            [
                -24576,
                -30720
            ],
            [
                24576,
                30720
            ]
        ],
        "continent_rect": [
            [
                36608,
                30976
            ],
            [
                38656,
                33536
            ]
        ],
        "map_name": "Discovering Scarlet's Breakthrough"
    },
    "998": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "map_rect": [
            [
                -24576,
                -30720
            ],
            [
                24576,
                30720
            ]
        ],
        "continent_rect": [
            [
                36608,
                30976
            ],
            [
                38656,
                33536
            ]
        ],
        "map_name": "The Machine"
    },
    "999": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "map_rect": [
            [
                -49152,
                -24576
            ],
            [
                49152,
                24576
            ]
        ],
        "continent_rect": [
            [
                42112,
                30464
            ],
            [
                46208,
                32512
            ]
        ],
        "map_name": "Trouble at Fort Salma"
    },
    "1000": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 11,
        "region_name": "Maguuma Wastes",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -24576,
                -30720
            ],
            [
                24576,
                30720
            ]
        ],
        "continent_rect": [
            [
                36608,
                30976
            ],
            [
                38656,
                33536
            ]
        ],
        "map_name": "The Waypoint Conundrum"
    },
    "1001": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1,
            2
        ],
        "region_id": 1,
        "region_name": "Shiverpeak Mountains",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -27648,
                -18432
            ],
            [
                27648,
                21504
            ]
        ],
        "continent_rect": [
            [
                52224,
                29696
            ],
            [
                54528,
                31360
            ]
        ],
        "map_name": "Summit Invitations"
    },
    "1002": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 1,
        "region_name": "Shiverpeak Mountains",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -36864,
                -36864
            ],
            [
                36864,
                36864
            ]
        ],
        "continent_rect": [
            [
                53504,
                24576
            ],
            [
                56576,
                27648
            ]
        ],
        "map_name": "Mission Accomplished"
    },
    "1003": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 2,
        "type": "Instance",
        "floors": [
            2
        ],
        "region_id": 5,
        "region_name": "Tarnished Coast",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -15360,
                -24576
            ],
            [
                18432,
                24576
            ]
        ],
        "continent_rect": [
            [
                42496,
                36480
            ],
            [
                43904,
                38528
            ]
        ],
        "map_name": "Rallying Call"
    },
    "1004": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 2,
        "region_name": "Ascalon",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -49152,
                -24576
            ],
            [
                49152,
                24576
            ]
        ],
        "continent_rect": [
            [
                57856,
                29952
            ],
            [
                61952,
                32000
            ]
        ],
        "map_name": "Plan of Attack"
    },
    "1005": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1,
            3,
            2,
            0
        ],
        "region_id": 4,
        "region_name": "Kryta",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -21504,
                -21504
            ],
            [
                24576,
                21504
            ]
        ],
        "continent_rect": [
            [
                43008,
                26240
            ],
            [
                44928,
                28032
            ]
        ],
        "map_name": "Party Politics"
    },
    "1006": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 2,
        "region_name": "Ascalon",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -49152,
                -24576
            ],
            [
                49152,
                24576
            ]
        ],
        "continent_rect": [
            [
                57856,
                29952
            ],
            [
                61952,
                32000
            ]
        ],
        "map_name": "Foefire Cleansing"
    },
    "1007": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 11,
        "region_name": "Maguuma Wastes",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -24576,
                -30720
            ],
            [
                24576,
                30720
            ]
        ],
        "continent_rect": [
            [
                36608,
                30976
            ],
            [
                38656,
                33536
            ]
        ],
        "map_name": "Recalibrating the Waypoints"
    },
    "1008": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 4,
        "region_name": "Kryta",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -49152,
                -24576
            ],
            [
                49152,
                24576
            ]
        ],
        "continent_rect": [
            [
                42112,
                30464
            ],
            [
                46208,
                32512
            ]
        ],
        "map_name": "The Ghosts of Fort Salma"
    },
    "1009": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 11,
        "region_name": "Maguuma Wastes",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -24576,
                -30720
            ],
            [
                24576,
                30720
            ]
        ],
        "continent_rect": [
            [
                36608,
                30976
            ],
            [
                38656,
                33536
            ]
        ],
        "map_name": "Taimi's Device"
    },
    "1010": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1,
            3,
            2,
            0
        ],
        "region_id": 5,
        "region_name": "Tarnished Coast",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -15360,
                -24576
            ],
            [
                18432,
                24576
            ]
        ],
        "continent_rect": [
            [
                42496,
                36480
            ],
            [
                43904,
                38528
            ]
        ],
        "map_name": "The World Summit"
    },
    "1011": {
        "min_level": 0,
        "max_level": 0,
        "default_floor": 35,
        "type": "Pvp",
        "floors": [
            1,
            35
        ],
        "region_id": 6,
        "region_name": "Player vs. Player",
        "continent_id": 2,
        "continent_name": "Mists",
        "map_rect": [
            [
                -12288,
                -6144
            ],
            [
                12288,
                9216
            ]
        ],
        "continent_rect": [
            [
                8448,
                7680
            ],
            [
                9472,
                8320
            ]
        ],
        "map_name": "Battle of Champion's Dusk"
    },
    "1015": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Public",
        "floors": [
            1,
            3,
            2,
            0
        ],
        "region_id": 11,
        "region_name": "Maguuma Wastes",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -24576,
                -18432
            ],
            [
                24576,
                18432
            ]
        ],
        "continent_rect": [
            [
                36608,
                30592
            ],
            [
                38656,
                32128
            ]
        ],
        "map_name": "The Silverwastes"
    },
    "1016": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1,
            -14,
            -13
        ],
        "region_id": 1,
        "region_name": "Shiverpeak Mountains",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -27648,
                -18432
            ],
            [
                30720,
                18432
            ]
        ],
        "continent_rect": [
            [
                49666,
                30720
            ],
            [
                52098,
                32256
            ]
        ],
        "map_name": "Hidden Arcana"
    },
    "1017": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 11,
        "region_name": "Maguuma Wastes",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -24576,
                -18432
            ],
            [
                24576,
                18432
            ]
        ],
        "continent_rect": [
            [
                36608,
                30592
            ],
            [
                38656,
                32128
            ]
        ],
        "map_name": "Reunion with the Pact"
    },
    "1018": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 11,
        "region_name": "Maguuma Wastes",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -24576,
                -18432
            ],
            [
                24576,
                18432
            ]
        ],
        "continent_rect": [
            [
                36608,
                30592
            ],
            [
                38656,
                32128
            ]
        ],
        "map_name": "Caithe's Reconnaissance Squad"
    },
    "1019": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 3,
        "region_name": "Ruins of Orr",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -39936,
                -33792
            ],
            [
                39936,
                33792
            ]
        ],
        "continent_rect": [
            [
                47232,
                38784
            ],
            [
                50560,
                41600
            ]
        ],
        "map_name": "Fort Trinity"
    },
    "1021": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "map_rect": [
            [
                -24576,
                -18432
            ],
            [
                24576,
                18432
            ]
        ],
        "continent_rect": [
            [
                36608,
                30592
            ],
            [
                38656,
                32128
            ]
        ],
        "map_name": "Into the Labyrinth"
    },
    "1022": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 11,
        "region_name": "Maguuma Wastes",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -24576,
                -18432
            ],
            [
                24576,
                18432
            ]
        ],
        "continent_rect": [
            [
                36608,
                30592
            ],
            [
                38656,
                32128
            ]
        ],
        "map_name": "Return to Camp Resolve"
    },
    "1023": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "map_rect": [
            [
                -24576,
                -18432
            ],
            [
                24576,
                18432
            ]
        ],
        "continent_rect": [
            [
                36608,
                30592
            ],
            [
                38656,
                32128
            ]
        ],
        "map_name": "Tracking the Aspect Masters"
    },
    "1024": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 11,
        "region_name": "Maguuma Wastes",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -24576,
                -18432
            ],
            [
                24576,
                18432
            ]
        ],
        "continent_rect": [
            [
                36608,
                30592
            ],
            [
                38656,
                32128
            ]
        ],
        "map_name": "No Refuge"
    },
    "1025": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1,
            3,
            2,
            0
        ],
        "region_id": 5,
        "region_name": "Tarnished Coast",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -15360,
                -24576
            ],
            [
                18432,
                24576
            ]
        ],
        "continent_rect": [
            [
                42496,
                36480
            ],
            [
                43904,
                38528
            ]
        ],
        "map_name": "The Newly Awakened"
    },
    "1026": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 5,
        "region_name": "Tarnished Coast",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -24576,
                -39936
            ],
            [
                27648,
                39936
            ]
        ],
        "continent_rect": [
            [
                39936,
                33536
            ],
            [
                42112,
                36864
            ]
        ],
        "map_name": "Meeting the Asura"
    },
    "1027": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 11,
        "region_name": "Maguuma Wastes",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -24576,
                -18432
            ],
            [
                24576,
                18432
            ]
        ],
        "continent_rect": [
            [
                36608,
                30592
            ],
            [
                38656,
                32128
            ]
        ],
        "map_name": "Pact Assaulted"
    },
    "1028": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 5,
        "region_name": "Tarnished Coast",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -24576,
                -18432
            ],
            [
                24576,
                18432
            ]
        ],
        "continent_rect": [
            [
                36608,
                30592
            ],
            [
                38656,
                32128
            ]
        ],
        "map_name": "The Mystery Cave"
    },
    "1029": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1,
            -13
        ],
        "region_id": 1,
        "region_name": "Shiverpeak Mountains",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -27648,
                -18432
            ],
            [
                30720,
                18432
            ]
        ],
        "continent_rect": [
            [
                49666,
                30720
            ],
            [
                52098,
                32256
            ]
        ],
        "map_name": "Arcana Obscura"
    },
    "1032": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1,
            48
        ],
        "region_id": 10,
        "region_name": "Heart of Maguuma",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -24576,
                -33792
            ],
            [
                24576,
                33792
            ]
        ],
        "continent_rect": [
            [
                33280,
                32512
            ],
            [
                35328,
                35328
            ]
        ],
        "map_name": "Prized Possessions"
    },
    "1033": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 0,
        "type": "Instance",
        "floors": [
            47,
            0
        ],
        "region_id": 10,
        "region_name": "Heart of Maguuma",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -39936,
                -27648
            ],
            [
                39936,
                27648
            ]
        ],
        "continent_rect": [
            [
                35328,
                33792
            ],
            [
                38656,
                36096
            ]
        ],
        "map_name": "Buried Insight"
    },
    "1037": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1,
            48
        ],
        "region_id": 10,
        "region_name": "Heart of Maguuma",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -36864,
                -18432
            ],
            [
                39936,
                18432
            ]
        ],
        "continent_rect": [
            [
                33408,
                30976
            ],
            [
                36608,
                32512
            ]
        ],
        "map_name": "The Jungle Provides"
    },
    "1040": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": -18,
        "type": "Instance",
        "floors": [
            -20,
            -21,
            -19,
            -18
        ],
        "region_id": 10,
        "region_name": "Heart of Maguuma",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -12288,
                -12288
            ],
            [
                15360,
                15360
            ]
        ],
        "continent_rect": [
            [
                34048,
                37328
            ],
            [
                35200,
                38480
            ]
        ],
        "map_name": "Hearts and Minds"
    },
    "1041": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Public",
        "floors": [
            1,
            47,
            2,
            0,
            48,
            3
        ],
        "region_id": 10,
        "region_name": "Heart of Maguuma",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -36864,
                -30720
            ],
            [
                36864,
                33792
            ]
        ],
        "continent_rect": [
            [
                34048,
                36096
            ],
            [
                37120,
                38784
            ]
        ],
        "map_name": "Dragon's Stand"
    },
    "1042": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 46,
        "type": "Public",
        "floors": [
            46
        ],
        "region_id": 10,
        "region_name": "Heart of Maguuma",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -36864,
                -36864
            ],
            [
                36864,
                36864
            ]
        ],
        "continent_rect": [
            [
                34208,
                30658
            ],
            [
                37280,
                33730
            ]
        ],
        "map_name": "Verdant Brink"
    },
    "1043": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Public",
        "floors": [
            1,
            47,
            2,
            0,
            48,
            3
        ],
        "region_id": 10,
        "region_name": "Heart of Maguuma",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -24576,
                -33792
            ],
            [
                24576,
                33792
            ]
        ],
        "continent_rect": [
            [
                33280,
                32512
            ],
            [
                35328,
                35328
            ]
        ],
        "map_name": "Auric Basin"
    },
    "1045": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Public",
        "floors": [
            1,
            47,
            2,
            0,
            48,
            3
        ],
        "region_id": 10,
        "region_name": "Heart of Maguuma",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -39936,
                -27648
            ],
            [
                39936,
                27648
            ]
        ],
        "continent_rect": [
            [
                35328,
                33792
            ],
            [
                38656,
                36096
            ]
        ],
        "map_name": "Tangled Depths"
    },
    "1046": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1,
            48
        ],
        "region_id": 10,
        "region_name": "Heart of Maguuma",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -39936,
                -27648
            ],
            [
                39936,
                27648
            ]
        ],
        "continent_rect": [
            [
                35328,
                33792
            ],
            [
                38656,
                36096
            ]
        ],
        "map_name": "Roots of Terror"
    },
    "1048": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1,
            48
        ],
        "region_id": 10,
        "region_name": "Heart of Maguuma",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -24576,
                -33792
            ],
            [
                24576,
                33792
            ]
        ],
        "continent_rect": [
            [
                33280,
                32512
            ],
            [
                35328,
                35328
            ]
        ],
        "map_name": "City of Hope"
    },
    "1050": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1,
            48
        ],
        "region_id": 10,
        "region_name": "Heart of Maguuma",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -36864,
                -18432
            ],
            [
                39936,
                18432
            ]
        ],
        "continent_rect": [
            [
                33408,
                30976
            ],
            [
                36608,
                32512
            ]
        ],
        "map_name": "Torn from the Sky"
    },
    "1051": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1,
            48
        ],
        "region_id": 10,
        "region_name": "Heart of Maguuma",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -36864,
                -18432
            ],
            [
                39936,
                18432
            ]
        ],
        "continent_rect": [
            [
                33408,
                30976
            ],
            [
                36608,
                32512
            ]
        ],
        "map_name": "Prisoners of the Dragon"
    },
    "1052": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Public",
        "floors": [
            1,
            47,
            2,
            0,
            48,
            3
        ],
        "region_id": 10,
        "region_name": "Heart of Maguuma",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -36864,
                -18432
            ],
            [
                39936,
                18432
            ]
        ],
        "continent_rect": [
            [
                33408,
                30976
            ],
            [
                36608,
                32512
            ]
        ],
        "map_name": "Verdant Brink"
    },
    "1054": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1,
            48
        ],
        "region_id": 10,
        "region_name": "Heart of Maguuma",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -36864,
                -30720
            ],
            [
                36864,
                33792
            ]
        ],
        "continent_rect": [
            [
                34048,
                36096
            ],
            [
                37120,
                38784
            ]
        ],
        "map_name": "Bitter Harvest"
    },
    "1057": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1,
            48
        ],
        "region_id": 10,
        "region_name": "Heart of Maguuma",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -24576,
                -33792
            ],
            [
                24576,
                33792
            ]
        ],
        "continent_rect": [
            [
                33280,
                32512
            ],
            [
                35328,
                35328
            ]
        ],
        "map_name": "Strange Observations"
    },
    "1058": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Tutorial",
        "floors": [
            1
        ],
        "region_id": 11,
        "region_name": "Maguuma Wastes",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -24576,
                -18432
            ],
            [
                24576,
                18432
            ]
        ],
        "continent_rect": [
            [
                36608,
                30592
            ],
            [
                38656,
                32128
            ]
        ],
        "map_name": "Prologue: Rally to Maguuma"
    },
    "1062": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1,
            47,
            2,
            0,
            48,
            3
        ],
        "region_id": 10,
        "region_name": "Heart of Maguuma",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -15360,
                -36864
            ],
            [
                15360,
                39936
            ]
        ],
        "continent_rect": [
            [
                36224,
                27396
            ],
            [
                37504,
                30596
            ]
        ],
        "map_name": "Spirit Vale"
    },
    "1063": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 4,
        "region_name": "Kryta",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -30720,
                -21504
            ],
            [
                33792,
                21504
            ]
        ],
        "continent_rect": [
            [
                44288,
                35328
            ],
            [
                46976,
                37120
            ]
        ],
        "map_name": "Southsun Crab Toss"
    },
    "1064": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 48,
        "type": "Instance",
        "floors": [
            1,
            48
        ],
        "region_id": 10,
        "region_name": "Heart of Maguuma",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -15360,
                -15360
            ],
            [
                15360,
                15360
            ]
        ],
        "continent_rect": [
            [
                33536,
                29696
            ],
            [
                34816,
                30976
            ]
        ],
        "map_name": "Claiming the Lost Precipice"
    },
    "1065": {
        "min_level": 15,
        "max_level": 25,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 1,
        "region_name": "Shiverpeak Mountains",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -49152,
                -24576
            ],
            [
                49152,
                24576
            ]
        ],
        "continent_rect": [
            [
                50432,
                27648
            ],
            [
                54528,
                29696
            ]
        ],
        "map_name": "Angvar's Trove"
    },
    "1066": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 47,
        "type": "Instance",
        "floors": [
            47,
            0
        ],
        "region_id": 10,
        "region_name": "Heart of Maguuma",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -15360,
                -15360
            ],
            [
                15360,
                15360
            ]
        ],
        "continent_rect": [
            [
                35328,
                32512
            ],
            [
                36608,
                33792
            ]
        ],
        "map_name": "Claiming the Gilded Hollow"
    },
    "1067": {
        "min_level": 15,
        "max_level": 25,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 1,
        "region_name": "Shiverpeak Mountains",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -49152,
                -24576
            ],
            [
                49152,
                24576
            ]
        ],
        "continent_rect": [
            [
                50432,
                27648
            ],
            [
                54528,
                29696
            ]
        ],
        "map_name": "Angvar's Trove"
    },
    "1068": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 0,
        "type": "Instance",
        "floors": [
            47,
            0
        ],
        "region_id": 10,
        "region_name": "Heart of Maguuma",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -15360,
                -15360
            ],
            [
                15360,
                15360
            ]
        ],
        "continent_rect": [
            [
                35328,
                32512
            ],
            [
                36608,
                33792
            ]
        ],
        "map_name": "Gilded Hollow"
    },
    "1069": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1,
            48
        ],
        "region_id": 10,
        "region_name": "Heart of Maguuma",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -15360,
                -15360
            ],
            [
                15360,
                15360
            ]
        ],
        "continent_rect": [
            [
                33536,
                29696
            ],
            [
                34816,
                30976
            ]
        ],
        "map_name": "Lost Precipice"
    },
    "1070": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 48,
        "type": "Instance",
        "floors": [
            1,
            48
        ],
        "region_id": 10,
        "region_name": "Heart of Maguuma",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -15360,
                -15360
            ],
            [
                15360,
                15360
            ]
        ],
        "continent_rect": [
            [
                33536,
                29696
            ],
            [
                34816,
                30976
            ]
        ],
        "map_name": "Claiming the Lost Precipice"
    },
    "1071": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1,
            48
        ],
        "region_id": 10,
        "region_name": "Heart of Maguuma",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -15360,
                -15360
            ],
            [
                15360,
                15360
            ]
        ],
        "continent_rect": [
            [
                33536,
                29696
            ],
            [
                34816,
                30976
            ]
        ],
        "map_name": "Lost Precipice"
    },
    "1072": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 4,
        "region_name": "Kryta",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -30720,
                -21504
            ],
            [
                33792,
                21504
            ]
        ],
        "continent_rect": [
            [
                44288,
                35328
            ],
            [
                46976,
                37120
            ]
        ],
        "map_name": "Southsun Crab Toss"
    },
    "1073": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 4,
        "region_name": "Kryta",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -27648,
                -18432
            ],
            [
                30720,
                18432
            ]
        ],
        "continent_rect": [
            [
                48000,
                30720
            ],
            [
                50432,
                32256
            ]
        ],
        "map_name": "Guild Initiative Office"
    },
    "1074": {
        "min_level": 40,
        "max_level": 50,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 2,
        "region_name": "Ascalon",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -24576,
                -49152
            ],
            [
                24576,
                49152
            ]
        ],
        "continent_rect": [
            [
                61952,
                28544
            ],
            [
                64000,
                32640
            ]
        ],
        "map_name": "Blightwater Shatterstrike"
    },
    "1075": {
        "min_level": 15,
        "max_level": 25,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 5,
        "region_name": "Tarnished Coast",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -39936,
                -30720
            ],
            [
                43008,
                33792
            ]
        ],
        "continent_rect": [
            [
                38656,
                30848
            ],
            [
                42112,
                33536
            ]
        ],
        "map_name": "Proxemics Lab"
    },
    "1076": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1,
            48
        ],
        "region_id": 10,
        "region_name": "Heart of Maguuma",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -15360,
                -15360
            ],
            [
                15360,
                15360
            ]
        ],
        "continent_rect": [
            [
                33536,
                29696
            ],
            [
                34816,
                30976
            ]
        ],
        "map_name": "Lost Precipice"
    },
    "1078": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 47,
        "type": "Instance",
        "floors": [
            47,
            0
        ],
        "region_id": 10,
        "region_name": "Heart of Maguuma",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -15360,
                -15360
            ],
            [
                15360,
                15360
            ]
        ],
        "continent_rect": [
            [
                35328,
                32512
            ],
            [
                36608,
                33792
            ]
        ],
        "map_name": "Claiming the Gilded Hollow"
    },
    "1079": {
        "min_level": 60,
        "max_level": 70,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 5,
        "region_name": "Tarnished Coast",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -46080,
                -27648
            ],
            [
                46080,
                30720
            ]
        ],
        "continent_rect": [
            [
                50560,
                37760
            ],
            [
                54400,
                40192
            ]
        ],
        "map_name": "Deep Trouble"
    },
    "1080": {
        "min_level": 30,
        "max_level": 40,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 2,
        "region_name": "Ascalon",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -36864,
                -36864
            ],
            [
                36864,
                36864
            ]
        ],
        "continent_rect": [
            [
                61440,
                32640
            ],
            [
                64512,
                35712
            ]
        ],
        "map_name": "Branded for Termination"
    },
    "1081": {
        "min_level": 1,
        "max_level": 15,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 2,
        "region_name": "Ascalon",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -49152,
                -24576
            ],
            [
                49152,
                24576
            ]
        ],
        "continent_rect": [
            [
                57856,
                29952
            ],
            [
                61952,
                32000
            ]
        ],
        "map_name": "Langmar Estate"
    },
    "1082": {
        "min_level": 1,
        "max_level": 15,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 2,
        "region_name": "Ascalon",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -49152,
                -24576
            ],
            [
                49152,
                24576
            ]
        ],
        "continent_rect": [
            [
                57856,
                29952
            ],
            [
                61952,
                32000
            ]
        ],
        "map_name": "Langmar Estate"
    },
    "1083": {
        "min_level": 60,
        "max_level": 70,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 5,
        "region_name": "Tarnished Coast",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -46080,
                -27648
            ],
            [
                46080,
                30720
            ]
        ],
        "continent_rect": [
            [
                50560,
                37760
            ],
            [
                54400,
                40192
            ]
        ],
        "map_name": "Deep Trouble"
    },
    "1084": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 4,
        "region_name": "Kryta",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -30720,
                -21504
            ],
            [
                33792,
                21504
            ]
        ],
        "continent_rect": [
            [
                44288,
                35328
            ],
            [
                46976,
                37120
            ]
        ],
        "map_name": "Southsun Crab Toss"
    },
    "1086": {
        "min_level": 50,
        "max_level": 60,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 2,
        "region_name": "Ascalon",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -24576,
                -49152
            ],
            [
                24576,
                49152
            ]
        ],
        "continent_rect": [
            [
                59904,
                25856
            ],
            [
                61952,
                29952
            ]
        ],
        "map_name": "Save Our Supplies"
    },
    "1087": {
        "min_level": 15,
        "max_level": 25,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 5,
        "region_name": "Tarnished Coast",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -39936,
                -30720
            ],
            [
                43008,
                33792
            ]
        ],
        "continent_rect": [
            [
                38656,
                30848
            ],
            [
                42112,
                33536
            ]
        ],
        "map_name": "Proxemics Lab"
    },
    "1088": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 47,
        "type": "Instance",
        "floors": [
            47,
            0
        ],
        "region_id": 10,
        "region_name": "Heart of Maguuma",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -15360,
                -15360
            ],
            [
                15360,
                15360
            ]
        ],
        "continent_rect": [
            [
                35328,
                32512
            ],
            [
                36608,
                33792
            ]
        ],
        "map_name": "Claiming the Gilded Hollow"
    },
    "1089": {
        "min_level": 15,
        "max_level": 25,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 1,
        "region_name": "Shiverpeak Mountains",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -49152,
                -24576
            ],
            [
                49152,
                24576
            ]
        ],
        "continent_rect": [
            [
                50432,
                27648
            ],
            [
                54528,
                29696
            ]
        ],
        "map_name": "Angvar's Trove"
    },
    "1090": {
        "min_level": 1,
        "max_level": 15,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 2,
        "region_name": "Ascalon",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -49152,
                -24576
            ],
            [
                49152,
                24576
            ]
        ],
        "continent_rect": [
            [
                57856,
                29952
            ],
            [
                61952,
                32000
            ]
        ],
        "map_name": "Langmar Estate"
    },
    "1091": {
        "min_level": 50,
        "max_level": 60,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 2,
        "region_name": "Ascalon",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -24576,
                -49152
            ],
            [
                24576,
                49152
            ]
        ],
        "continent_rect": [
            [
                59904,
                25856
            ],
            [
                61952,
                29952
            ]
        ],
        "map_name": "Save Our Supplies"
    },
    "1092": {
        "min_level": 50,
        "max_level": 60,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 1,
        "region_name": "Shiverpeak Mountains",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -27648,
                -36864
            ],
            [
                27648,
                39936
            ]
        ],
        "continent_rect": [
            [
                51712,
                34560
            ],
            [
                54016,
                37760
            ]
        ],
        "map_name": "Scratch Sentry Defense"
    },
    "1093": {
        "min_level": 15,
        "max_level": 25,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 1,
        "region_name": "Shiverpeak Mountains",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -49152,
                -24576
            ],
            [
                49152,
                24576
            ]
        ],
        "continent_rect": [
            [
                50432,
                27648
            ],
            [
                54528,
                29696
            ]
        ],
        "map_name": "Angvar's Trove"
    },
    "1094": {
        "min_level": 50,
        "max_level": 60,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 2,
        "region_name": "Ascalon",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -24576,
                -49152
            ],
            [
                24576,
                49152
            ]
        ],
        "continent_rect": [
            [
                59904,
                25856
            ],
            [
                61952,
                29952
            ]
        ],
        "map_name": "Save Our Supplies"
    },
    "1095": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Public",
        "floors": [
            1,
            48
        ],
        "region_id": 10,
        "region_name": "Heart of Maguuma",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -36864,
                -30720
            ],
            [
                36864,
                33792
            ]
        ],
        "continent_rect": [
            [
                34048,
                36096
            ],
            [
                37120,
                38784
            ]
        ],
        "map_name": "Dragon's Stand (Heart of Thorns)"
    },
    "1097": {
        "min_level": 15,
        "max_level": 25,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 5,
        "region_name": "Tarnished Coast",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -39936,
                -30720
            ],
            [
                43008,
                33792
            ]
        ],
        "continent_rect": [
            [
                38656,
                30848
            ],
            [
                42112,
                33536
            ]
        ],
        "map_name": "Proxemics Lab"
    },
    "1098": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 47,
        "type": "Instance",
        "floors": [
            47,
            0
        ],
        "region_id": 10,
        "region_name": "Heart of Maguuma",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -15360,
                -15360
            ],
            [
                15360,
                15360
            ]
        ],
        "continent_rect": [
            [
                35328,
                32512
            ],
            [
                36608,
                33792
            ]
        ],
        "map_name": "Claiming the Gilded Hollow"
    },
    "1099": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 3,
        "type": "RedHome",
        "floors": [
            1,
            3
        ],
        "region_id": 7,
        "region_name": "World vs. World",
        "continent_id": 2,
        "continent_name": "Mists",
        "map_rect": [
            [
                -36864,
                -36864
            ],
            [
                36864,
                36864
            ]
        ],
        "continent_rect": [
            [
                9214,
                8958
            ],
            [
                12286,
                12030
            ]
        ],
        "map_name": " Desert Borderlands"
    },
    "1100": {
        "min_level": 50,
        "max_level": 60,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 1,
        "region_name": "Shiverpeak Mountains",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -27648,
                -36864
            ],
            [
                27648,
                39936
            ]
        ],
        "continent_rect": [
            [
                51712,
                34560
            ],
            [
                54016,
                37760
            ]
        ],
        "map_name": "Scratch Sentry Defense"
    },
    "1101": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 0,
        "type": "Instance",
        "floors": [
            47,
            0
        ],
        "region_id": 10,
        "region_name": "Heart of Maguuma",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -15360,
                -15360
            ],
            [
                15360,
                15360
            ]
        ],
        "continent_rect": [
            [
                35328,
                32512
            ],
            [
                36608,
                33792
            ]
        ],
        "map_name": "Gilded Hollow"
    },
    "1104": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1,
            48
        ],
        "region_id": 10,
        "region_name": "Heart of Maguuma",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -15360,
                -15360
            ],
            [
                15360,
                15360
            ]
        ],
        "continent_rect": [
            [
                33536,
                29696
            ],
            [
                34816,
                30976
            ]
        ],
        "map_name": "Lost Precipice"
    },
    "1105": {
        "min_level": 1,
        "max_level": 15,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 2,
        "region_name": "Ascalon",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -49152,
                -24576
            ],
            [
                49152,
                24576
            ]
        ],
        "continent_rect": [
            [
                57856,
                29952
            ],
            [
                61952,
                32000
            ]
        ],
        "map_name": "Langmar Estate"
    },
    "1106": {
        "min_level": 60,
        "max_level": 70,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 5,
        "region_name": "Tarnished Coast",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -46080,
                -27648
            ],
            [
                46080,
                30720
            ]
        ],
        "continent_rect": [
            [
                50560,
                37760
            ],
            [
                54400,
                40192
            ]
        ],
        "map_name": "Deep Trouble"
    },
    "1107": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 0,
        "type": "Instance",
        "floors": [
            47,
            0
        ],
        "region_id": 10,
        "region_name": "Heart of Maguuma",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -15360,
                -15360
            ],
            [
                15360,
                15360
            ]
        ],
        "continent_rect": [
            [
                35328,
                32512
            ],
            [
                36608,
                33792
            ]
        ],
        "map_name": "Gilded Hollow"
    },
    "1108": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 0,
        "type": "Instance",
        "floors": [
            47,
            0
        ],
        "region_id": 10,
        "region_name": "Heart of Maguuma",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -15360,
                -15360
            ],
            [
                15360,
                15360
            ]
        ],
        "continent_rect": [
            [
                35328,
                32512
            ],
            [
                36608,
                33792
            ]
        ],
        "map_name": "Gilded Hollow"
    },
    "1109": {
        "min_level": 15,
        "max_level": 25,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 1,
        "region_name": "Shiverpeak Mountains",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -49152,
                -24576
            ],
            [
                49152,
                24576
            ]
        ],
        "continent_rect": [
            [
                50432,
                27648
            ],
            [
                54528,
                29696
            ]
        ],
        "map_name": "Angvar's Trove"
    },
    "1110": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 0,
        "type": "Instance",
        "floors": [
            47,
            0
        ],
        "region_id": 10,
        "region_name": "Heart of Maguuma",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -39936,
                -27648
            ],
            [
                39936,
                27648
            ]
        ],
        "continent_rect": [
            [
                35328,
                33792
            ],
            [
                38656,
                36096
            ]
        ],
        "map_name": "Scrap Rifle Field Test"
    },
    "1111": {
        "min_level": 50,
        "max_level": 60,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 1,
        "region_name": "Shiverpeak Mountains",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -27648,
                -36864
            ],
            [
                27648,
                39936
            ]
        ],
        "continent_rect": [
            [
                51712,
                34560
            ],
            [
                54016,
                37760
            ]
        ],
        "map_name": "Scratch Sentry Defense"
    },
    "1112": {
        "min_level": 30,
        "max_level": 40,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 2,
        "region_name": "Ascalon",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -36864,
                -36864
            ],
            [
                36864,
                36864
            ]
        ],
        "continent_rect": [
            [
                61440,
                32640
            ],
            [
                64512,
                35712
            ]
        ],
        "map_name": "Branded for Termination"
    },
    "1113": {
        "min_level": 50,
        "max_level": 60,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 1,
        "region_name": "Shiverpeak Mountains",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -27648,
                -36864
            ],
            [
                27648,
                39936
            ]
        ],
        "continent_rect": [
            [
                51712,
                34560
            ],
            [
                54016,
                37760
            ]
        ],
        "map_name": "Scratch Sentry Defense"
    },
    "1115": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 0,
        "type": "Instance",
        "floors": [
            47,
            0
        ],
        "region_id": 10,
        "region_name": "Heart of Maguuma",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -39936,
                -27648
            ],
            [
                39936,
                27648
            ]
        ],
        "continent_rect": [
            [
                35328,
                33792
            ],
            [
                38656,
                36096
            ]
        ],
        "map_name": "Haywire Punch-o-Matic Battle"
    },
    "1116": {
        "min_level": 60,
        "max_level": 70,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 5,
        "region_name": "Tarnished Coast",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -46080,
                -27648
            ],
            [
                46080,
                30720
            ]
        ],
        "continent_rect": [
            [
                50560,
                37760
            ],
            [
                54400,
                40192
            ]
        ],
        "map_name": "Deep Trouble"
    },
    "1117": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 48,
        "type": "Instance",
        "floors": [
            1,
            48
        ],
        "region_id": 10,
        "region_name": "Heart of Maguuma",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -15360,
                -15360
            ],
            [
                15360,
                15360
            ]
        ],
        "continent_rect": [
            [
                33536,
                29696
            ],
            [
                34816,
                30976
            ]
        ],
        "map_name": "Claiming the Lost Precipice"
    },
    "1118": {
        "min_level": 50,
        "max_level": 60,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 2,
        "region_name": "Ascalon",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -24576,
                -49152
            ],
            [
                24576,
                49152
            ]
        ],
        "continent_rect": [
            [
                59904,
                25856
            ],
            [
                61952,
                29952
            ]
        ],
        "map_name": "Save Our Supplies"
    },
    "1121": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 0,
        "type": "Instance",
        "floors": [
            47,
            0
        ],
        "region_id": 10,
        "region_name": "Heart of Maguuma",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -15360,
                -15360
            ],
            [
                15360,
                15360
            ]
        ],
        "continent_rect": [
            [
                35328,
                32512
            ],
            [
                36608,
                33792
            ]
        ],
        "map_name": "Gilded Hollow"
    },
    "1122": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 47,
        "type": "Instance",
        "floors": [
            47,
            0
        ],
        "region_id": 10,
        "region_name": "Heart of Maguuma",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -15360,
                -15360
            ],
            [
                15360,
                15360
            ]
        ],
        "continent_rect": [
            [
                35328,
                32512
            ],
            [
                36608,
                33792
            ]
        ],
        "map_name": "Claiming the Gilded Hollow"
    },
    "1123": {
        "min_level": 40,
        "max_level": 50,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 2,
        "region_name": "Ascalon",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -24576,
                -49152
            ],
            [
                24576,
                49152
            ]
        ],
        "continent_rect": [
            [
                61952,
                28544
            ],
            [
                64000,
                32640
            ]
        ],
        "map_name": "Blightwater Shatterstrike"
    },
    "1124": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1,
            48
        ],
        "region_id": 10,
        "region_name": "Heart of Maguuma",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -15360,
                -15360
            ],
            [
                15360,
                15360
            ]
        ],
        "continent_rect": [
            [
                33536,
                29696
            ],
            [
                34816,
                30976
            ]
        ],
        "map_name": "Lost Precipice"
    },
    "1126": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 4,
        "region_name": "Kryta",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -30720,
                -21504
            ],
            [
                33792,
                21504
            ]
        ],
        "continent_rect": [
            [
                44288,
                35328
            ],
            [
                46976,
                37120
            ]
        ],
        "map_name": "Southsun Crab Toss"
    },
    "1128": {
        "min_level": 50,
        "max_level": 60,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 1,
        "region_name": "Shiverpeak Mountains",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -27648,
                -36864
            ],
            [
                27648,
                39936
            ]
        ],
        "continent_rect": [
            [
                51712,
                34560
            ],
            [
                54016,
                37760
            ]
        ],
        "map_name": "Scratch Sentry Defense"
    },
    "1129": {
        "min_level": 1,
        "max_level": 15,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 2,
        "region_name": "Ascalon",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -49152,
                -24576
            ],
            [
                49152,
                24576
            ]
        ],
        "continent_rect": [
            [
                57856,
                29952
            ],
            [
                61952,
                32000
            ]
        ],
        "map_name": "Langmar Estate"
    },
    "1130": {
        "min_level": 60,
        "max_level": 70,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 5,
        "region_name": "Tarnished Coast",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -46080,
                -27648
            ],
            [
                46080,
                30720
            ]
        ],
        "continent_rect": [
            [
                50560,
                37760
            ],
            [
                54400,
                40192
            ]
        ],
        "map_name": "Deep Trouble"
    },
    "1131": {
        "min_level": 40,
        "max_level": 50,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 2,
        "region_name": "Ascalon",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -24576,
                -49152
            ],
            [
                24576,
                49152
            ]
        ],
        "continent_rect": [
            [
                61952,
                28544
            ],
            [
                64000,
                32640
            ]
        ],
        "map_name": "Blightwater Shatterstrike"
    },
    "1132": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 48,
        "type": "Instance",
        "floors": [
            1,
            48
        ],
        "region_id": 10,
        "region_name": "Heart of Maguuma",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -15360,
                -15360
            ],
            [
                15360,
                15360
            ]
        ],
        "continent_rect": [
            [
                33536,
                29696
            ],
            [
                34816,
                30976
            ]
        ],
        "map_name": "Claiming the Lost Precipice"
    },
    "1133": {
        "min_level": 30,
        "max_level": 40,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 2,
        "region_name": "Ascalon",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -36864,
                -36864
            ],
            [
                36864,
                36864
            ]
        ],
        "continent_rect": [
            [
                61440,
                32640
            ],
            [
                64512,
                35712
            ]
        ],
        "map_name": "Branded for Termination"
    },
    "1134": {
        "min_level": 40,
        "max_level": 50,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 2,
        "region_name": "Ascalon",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -24576,
                -49152
            ],
            [
                24576,
                49152
            ]
        ],
        "continent_rect": [
            [
                61952,
                28544
            ],
            [
                64000,
                32640
            ]
        ],
        "map_name": "Blightwater Shatterstrike"
    },
    "1135": {
        "min_level": 30,
        "max_level": 40,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 2,
        "region_name": "Ascalon",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -36864,
                -36864
            ],
            [
                36864,
                36864
            ]
        ],
        "continent_rect": [
            [
                61440,
                32640
            ],
            [
                64512,
                35712
            ]
        ],
        "map_name": "Branded for Termination"
    },
    "1136": {
        "min_level": 15,
        "max_level": 25,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 5,
        "region_name": "Tarnished Coast",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -39936,
                -30720
            ],
            [
                43008,
                33792
            ]
        ],
        "continent_rect": [
            [
                38656,
                30848
            ],
            [
                42112,
                33536
            ]
        ],
        "map_name": "Proxemics Lab"
    },
    "1137": {
        "min_level": 15,
        "max_level": 25,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 5,
        "region_name": "Tarnished Coast",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -39936,
                -30720
            ],
            [
                43008,
                33792
            ]
        ],
        "continent_rect": [
            [
                38656,
                30848
            ],
            [
                42112,
                33536
            ]
        ],
        "map_name": "Proxemics Lab"
    },
    "1138": {
        "min_level": 50,
        "max_level": 60,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 2,
        "region_name": "Ascalon",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -24576,
                -49152
            ],
            [
                24576,
                49152
            ]
        ],
        "continent_rect": [
            [
                59904,
                25856
            ],
            [
                61952,
                29952
            ]
        ],
        "map_name": "Save Our Supplies"
    },
    "1139": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 4,
        "region_name": "Kryta",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -30720,
                -21504
            ],
            [
                33792,
                21504
            ]
        ],
        "continent_rect": [
            [
                44288,
                35328
            ],
            [
                46976,
                37120
            ]
        ],
        "map_name": "Southsun Crab Toss"
    },
    "1140": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 48,
        "type": "Instance",
        "floors": [
            1,
            48
        ],
        "region_id": 10,
        "region_name": "Heart of Maguuma",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -15360,
                -15360
            ],
            [
                15360,
                15360
            ]
        ],
        "continent_rect": [
            [
                33536,
                29696
            ],
            [
                34816,
                30976
            ]
        ],
        "map_name": "Claiming the Lost Precipice"
    },
    "1142": {
        "min_level": 40,
        "max_level": 50,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 2,
        "region_name": "Ascalon",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -24576,
                -49152
            ],
            [
                24576,
                49152
            ]
        ],
        "continent_rect": [
            [
                61952,
                28544
            ],
            [
                64000,
                32640
            ]
        ],
        "map_name": "Blightwater Shatterstrike"
    },
    "1146": {
        "min_level": 30,
        "max_level": 40,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 2,
        "region_name": "Ascalon",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -36864,
                -36864
            ],
            [
                36864,
                36864
            ]
        ],
        "continent_rect": [
            [
                61440,
                32640
            ],
            [
                64512,
                35712
            ]
        ],
        "map_name": "Branded for Termination"
    },
    "1147": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Public",
        "floors": [
            1,
            47,
            2,
            0,
            48,
            3
        ],
        "region_id": 10,
        "region_name": "Heart of Maguuma",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -15360,
                -36864
            ],
            [
                15360,
                39936
            ]
        ],
        "continent_rect": [
            [
                36224,
                27396
            ],
            [
                37504,
                30596
            ]
        ],
        "map_name": "Spirit Vale"
    },
    "1149": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1,
            47,
            2,
            0,
            48,
            3
        ],
        "region_id": 10,
        "region_name": "Heart of Maguuma",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -12288,
                -27648
            ],
            [
                12288,
                27648
            ]
        ],
        "continent_rect": [
            [
                35456,
                28290
            ],
            [
                36480,
                30594
            ]
        ],
        "map_name": "Salvation Pass"
    },
    "1153": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "map_rect": [
            [
                -46080,
                -27648
            ],
            [
                46080,
                30720
            ]
        ],
        "continent_rect": [
            [
                50560,
                37760
            ],
            [
                54400,
                40192
            ]
        ],
        "map_name": "Tiger Den"
    },
    "1154": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": -22,
        "type": "Instance",
        "floors": [
            -22
        ],
        "region_id": 4,
        "region_name": "Kryta",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -27648,
                -18432
            ],
            [
                30720,
                18432
            ]
        ],
        "continent_rect": [
            [
                48000,
                30846
            ],
            [
                50432,
                32382
            ]
        ],
        "map_name": "Special Forces Training Area"
    },
    "1155": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Public",
        "floors": [
            1
        ],
        "region_id": 4,
        "region_name": "Kryta",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -27648,
                -18432
            ],
            [
                30720,
                18432
            ]
        ],
        "continent_rect": [
            [
                47964,
                30806
            ],
            [
                50396,
                32342
            ]
        ],
        "map_name": "Lion's Arch Aerodrome"
    },
    "1156": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1,
            47,
            2,
            0,
            48,
            3
        ],
        "region_id": 10,
        "region_name": "Heart of Maguuma",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -12288,
                -27648
            ],
            [
                12288,
                27648
            ]
        ],
        "continent_rect": [
            [
                34688,
                28544
            ],
            [
                35712,
                30848
            ]
        ],
        "map_name": "Stronghold of the Faithful"
    },
    "1158": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Public",
        "floors": [
            1,
            48
        ],
        "region_id": 10,
        "region_name": "Heart of Maguuma",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -36864,
                -18432
            ],
            [
                39936,
                18432
            ]
        ],
        "continent_rect": [
            [
                33408,
                30976
            ],
            [
                36608,
                32512
            ]
        ],
        "map_name": "Noble's Folly"
    },
    "1159": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1,
            47,
            2,
            0,
            48,
            3
        ],
        "region_id": 10,
        "region_name": "Heart of Maguuma",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -39936,
                -27648
            ],
            [
                39936,
                27648
            ]
        ],
        "continent_rect": [
            [
                35328,
                33792
            ],
            [
                38656,
                36096
            ]
        ],
        "map_name": "Research in Rata Novus"
    },
    "1161": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1,
            3,
            2,
            0
        ],
        "region_id": 1,
        "region_name": "Shiverpeak Mountains",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -27648,
                -18432
            ],
            [
                27648,
                21504
            ]
        ],
        "continent_rect": [
            [
                52224,
                29696
            ],
            [
                54528,
                31360
            ]
        ],
        "map_name": "Eir's Homestead"
    },
    "1163": {
        "min_level": 0,
        "max_level": 0,
        "default_floor": 8,
        "type": "Pvp",
        "floors": [
            1,
            8
        ],
        "region_id": 6,
        "region_name": "Player vs. Player",
        "continent_id": 2,
        "continent_name": "Mists",
        "map_rect": [
            [
                -9216,
                -9216
            ],
            [
                9216,
                9216
            ]
        ],
        "continent_rect": [
            [
                7950,
                6545
            ],
            [
                8718,
                7313
            ]
        ],
        "map_name": "Revenge of the Capricorn"
    },
    "1164": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 20,
        "type": "Instance",
        "floors": [
            20
        ],
        "region_id": 26,
        "region_name": "Fractals of the Mists",
        "continent_id": 2,
        "continent_name": "Mists",
        "map_rect": [
            [
                -18432,
                -12288
            ],
            [
                18432,
                12288
            ]
        ],
        "continent_rect": [
            [
                11804,
                4414
            ],
            [
                13340,
                5438
            ]
        ],
        "map_name": "Fractals of the Mists"
    },
    "1165": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 2,
        "type": "Public",
        "floors": [
            1,
            47,
            2,
            0,
            48,
            3
        ],
        "region_id": 10,
        "region_name": "Heart of Maguuma",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -18432,
                -6144
            ],
            [
                18432,
                9216
            ]
        ],
        "continent_rect": [
            [
                34816,
                30338
            ],
            [
                36352,
                30978
            ]
        ],
        "map_name": "Bloodstone Fen"
    },
    "1166": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 2,
        "type": "Instance",
        "floors": [
            2
        ],
        "region_id": 10,
        "region_name": "Heart of Maguuma",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -18432,
                -6144
            ],
            [
                18432,
                9216
            ]
        ],
        "continent_rect": [
            [
                34816,
                30338
            ],
            [
                36352,
                30978
            ]
        ],
        "map_name": "Confessor's Stronghold"
    },
    "1167": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 0,
        "type": "Instance",
        "floors": [
            47,
            0
        ],
        "region_id": 10,
        "region_name": "Heart of Maguuma",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -18432,
                -6144
            ],
            [
                18432,
                9216
            ]
        ],
        "continent_rect": [
            [
                34816,
                30338
            ],
            [
                36352,
                30978
            ]
        ],
        "map_name": "A Shadow's Deeds"
    },
    "1169": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1,
            -7,
            47,
            2,
            0,
            48,
            3
        ],
        "region_id": 10,
        "region_name": "Heart of Maguuma",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -39936,
                -27648
            ],
            [
                39936,
                27648
            ]
        ],
        "continent_rect": [
            [
                35328,
                33792
            ],
            [
                38656,
                36096
            ]
        ],
        "map_name": "Rata Novus"
    },
    "1170": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1,
            47,
            2,
            0,
            48,
            3
        ],
        "region_id": 10,
        "region_name": "Heart of Maguuma",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -39936,
                -27648
            ],
            [
                39936,
                27648
            ]
        ],
        "continent_rect": [
            [
                35328,
                33792
            ],
            [
                38656,
                36096
            ]
        ],
        "map_name": "Taimi's Game"
    },
    "1171": {
        "min_level": 0,
        "max_level": 0,
        "default_floor": 37,
        "type": "Pvp",
        "floors": [
            1,
            37
        ],
        "region_id": 6,
        "region_name": "Player vs. Player",
        "continent_id": 2,
        "continent_name": "Mists",
        "map_rect": [
            [
                -12288,
                -9216
            ],
            [
                12288,
                9216
            ]
        ],
        "continent_rect": [
            [
                10268,
                6812
            ],
            [
                11292,
                7580
            ]
        ],
        "map_name": "Eternal Coliseum"
    },
    "1172": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1,
            47,
            2,
            0,
            48,
            3
        ],
        "region_id": 10,
        "region_name": "Heart of Maguuma",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -24576,
                -33792
            ],
            [
                24576,
                33792
            ]
        ],
        "continent_rect": [
            [
                33280,
                32512
            ],
            [
                35328,
                35328
            ]
        ],
        "map_name": "Dragon Vigil"
    },
    "1173": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": -24,
        "type": "Instance",
        "floors": [
            -24
        ],
        "region_id": 10,
        "region_name": "Heart of Maguuma",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -9216,
                -9216
            ],
            [
                9216,
                9216
            ]
        ],
        "continent_rect": [
            [
                37504,
                34432
            ],
            [
                38272,
                35200
            ]
        ],
        "map_name": "Taimi's Game"
    },
    "1175": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Public",
        "floors": [
            1,
            3,
            2,
            0
        ],
        "region_id": 10,
        "region_name": "Heart of Maguuma",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -46080,
                -46080
            ],
            [
                46080,
                46080
            ]
        ],
        "continent_rect": [
            [
                37374,
                43518
            ],
            [
                41214,
                47358
            ]
        ],
        "map_name": "Ember Bay"
    },
    "1176": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1,
            47,
            2,
            0,
            48,
            3
        ],
        "region_id": 10,
        "region_name": "Heart of Maguuma",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -39936,
                -27648
            ],
            [
                39936,
                27648
            ]
        ],
        "continent_rect": [
            [
                35328,
                33792
            ],
            [
                38656,
                36096
            ]
        ],
        "map_name": "Taimi's Game"
    },
    "1177": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 16,
        "type": "Instance",
        "floors": [
            16
        ],
        "region_id": 26,
        "region_name": "Fractals of the Mists",
        "continent_id": 2,
        "continent_name": "Mists",
        "map_rect": [
            [
                -6144,
                -6144
            ],
            [
                9216,
                9216
            ]
        ],
        "continent_rect": [
            [
                11804,
                4414
            ],
            [
                12444,
                5054
            ]
        ],
        "map_name": "Fractals of the Mists"
    },
    "1178": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Public",
        "floors": [
            1,
            3,
            2,
            0
        ],
        "region_id": 1,
        "region_name": "Shiverpeak Mountains",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -36864,
                -18432
            ],
            [
                36864,
                18432
            ]
        ],
        "continent_rect": [
            [
                53504,
                23040
            ],
            [
                56576,
                24576
            ]
        ],
        "map_name": "Bitterfrost Frontier"
    },
    "1180": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 1,
        "region_name": "Shiverpeak Mountains",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -36864,
                -18432
            ],
            [
                36864,
                18432
            ]
        ],
        "continent_rect": [
            [
                53504,
                23040
            ],
            [
                56576,
                24576
            ]
        ],
        "map_name": "The Bitter Cold"
    },
    "1181": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 1,
        "region_name": "Shiverpeak Mountains",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -36864,
                -18432
            ],
            [
                36864,
                18432
            ]
        ],
        "continent_rect": [
            [
                53504,
                23040
            ],
            [
                56576,
                24576
            ]
        ],
        "map_name": "Frozen Out"
    },
    "1182": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 0,
        "type": "Instance",
        "floors": [
            47,
            0
        ],
        "region_id": 10,
        "region_name": "Heart of Maguuma",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -24576,
                -33792
            ],
            [
                24576,
                33792
            ]
        ],
        "continent_rect": [
            [
                33280,
                32512
            ],
            [
                35328,
                35328
            ]
        ],
        "map_name": "Precocious Aurene"
    },
    "1185": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Public",
        "floors": [
            1,
            3,
            2,
            0
        ],
        "region_id": 4,
        "region_name": "Kryta",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -15360,
                -30720
            ],
            [
                15360,
                30720
            ]
        ],
        "continent_rect": [
            [
                44928,
                25472
            ],
            [
                46208,
                28032
            ]
        ],
        "map_name": "Lake Doric"
    },
    "1188": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1,
            47,
            2,
            0,
            48,
            3
        ],
        "region_id": 10,
        "region_name": "Heart of Maguuma",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -27648,
                -9216
            ],
            [
                27648,
                12288
            ]
        ],
        "continent_rect": [
            [
                44542,
                20864
            ],
            [
                46846,
                21760
            ]
        ],
        "map_name": "Bastion of the Penitent"
    },
    "1189": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 2,
        "type": "Instance",
        "floors": [
            2
        ],
        "region_id": 4,
        "region_name": "Kryta",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -21504,
                -21504
            ],
            [
                24576,
                21504
            ]
        ],
        "continent_rect": [
            [
                43008,
                26240
            ],
            [
                44928,
                28032
            ]
        ],
        "map_name": "Regrouping with the Queen"
    },
    "1190": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 2,
        "type": "Instance",
        "floors": [
            2
        ],
        "region_id": 4,
        "region_name": "Kryta",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -21504,
                -21504
            ],
            [
                24576,
                21504
            ]
        ],
        "continent_rect": [
            [
                43008,
                26240
            ],
            [
                44928,
                28032
            ]
        ],
        "map_name": "A Meeting of Ministers"
    },
    "1191": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 4,
        "type": "Instance",
        "floors": [
            5,
            -4,
            4
        ],
        "region_id": 4,
        "region_name": "Kryta",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -12288,
                -12288
            ],
            [
                12288,
                12288
            ]
        ],
        "continent_rect": [
            [
                45184,
                27776
            ],
            [
                46208,
                28800
            ]
        ],
        "map_name": "Confessor's End"
    },
    "1192": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 2,
        "type": "Instance",
        "floors": [
            2
        ],
        "region_id": 10,
        "region_name": "Heart of Maguuma",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -36864,
                -18432
            ],
            [
                39936,
                18432
            ]
        ],
        "continent_rect": [
            [
                33408,
                30976
            ],
            [
                36608,
                32512
            ]
        ],
        "map_name": "The Second Vision"
    },
    "1193": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 4,
        "region_name": "Kryta",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -49152,
                -24576
            ],
            [
                49152,
                24576
            ]
        ],
        "continent_rect": [
            [
                42112,
                30464
            ],
            [
                46208,
                32512
            ]
        ],
        "map_name": "The First Vision"
    },
    "1194": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 3,
        "region_name": "Ruins of Orr",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -24576,
                -49152
            ],
            [
                24576,
                49152
            ]
        ],
        "continent_rect": [
            [
                42880,
                41600
            ],
            [
                44928,
                45696
            ]
        ],
        "map_name": "The Sword Regrown"
    },
    "1195": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Public",
        "floors": [
            1,
            3,
            2,
            0
        ],
        "region_id": 20,
        "region_name": "Ring of Fire",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -46080,
                -46080
            ],
            [
                46080,
                46080
            ]
        ],
        "continent_rect": [
            [
                34718,
                39284
            ],
            [
                38558,
                43124
            ]
        ],
        "map_name": "Draconis Mons"
    },
    "1196": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": -28,
        "type": "Instance",
        "floors": [
            -28,
            -26,
            -27
        ],
        "region_id": 20,
        "region_name": "Ring of Fire",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -46080,
                -46080
            ],
            [
                46080,
                46080
            ]
        ],
        "continent_rect": [
            [
                34718,
                39284
            ],
            [
                38558,
                43124
            ]
        ],
        "map_name": "Heart of the Volcano"
    },
    "1198": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1,
            47,
            2,
            0,
            48,
            3
        ],
        "region_id": 10,
        "region_name": "Heart of Maguuma",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -39936,
                -27648
            ],
            [
                39936,
                27648
            ]
        ],
        "continent_rect": [
            [
                35328,
                33792
            ],
            [
                38656,
                36096
            ]
        ],
        "map_name": "Taimi's Pet Project"
    },
    "1200": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 39,
        "type": "Pvp",
        "floors": [
            1,
            39
        ],
        "region_id": 6,
        "region_name": "Player vs. Player",
        "continent_id": 2,
        "continent_name": "Mists",
        "map_rect": [
            [
                -6144,
                -6144
            ],
            [
                9216,
                9216
            ]
        ],
        "continent_rect": [
            [
                5172,
                4370
            ],
            [
                5812,
                5010
            ]
        ],
        "map_name": "Hall of the Mists"
    },
    "1201": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 40,
        "type": "Pvp",
        "floors": [
            1,
            40
        ],
        "region_id": 6,
        "region_name": "Player vs. Player",
        "continent_id": 2,
        "continent_name": "Mists",
        "map_rect": [
            [
                -6144,
                -6144
            ],
            [
                9216,
                9216
            ]
        ],
        "continent_rect": [
            [
                4448,
                4908
            ],
            [
                4768,
                5228
            ]
        ],
        "map_name": "Asura Arena"
    },
    "1202": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": -34,
        "type": "Instance",
        "floors": [
            -34
        ],
        "region_id": 5,
        "region_name": "Tarnished Coast",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -12288,
                -27648
            ],
            [
                12288,
                27648
            ]
        ],
        "continent_rect": [
            [
                38656,
                30848
            ],
            [
                39680,
                33152
            ]
        ],
        "map_name": "White Mantle Hideout"
    },
    "1203": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Public",
        "floors": [
            1,
            3,
            2,
            0
        ],
        "region_id": 3,
        "region_name": "Ruins of Orr",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -39936,
                -15360
            ],
            [
                39936,
                15360
            ]
        ],
        "continent_rect": [
            [
                47002,
                41600
            ],
            [
                50330,
                42880
            ]
        ],
        "map_name": "Siren's Landing"
    },
    "1204": {
        "min_level": 0,
        "max_level": 80,
        "default_floor": 2,
        "type": "Instance",
        "floors": [
            2
        ],
        "region_id": 4,
        "region_name": "Kryta",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -21504,
                -21504
            ],
            [
                24576,
                21504
            ]
        ],
        "continent_rect": [
            [
                43008,
                26240
            ],
            [
                44928,
                28032
            ]
        ],
        "map_name": "Palace Temple"
    },
    "1205": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 15,
        "type": "Instance",
        "floors": [
            15
        ],
        "region_id": 26,
        "region_name": "Fractals of the Mists",
        "continent_id": 2,
        "continent_name": "Mists",
        "map_rect": [
            [
                -24576,
                -24576
            ],
            [
                24576,
                24576
            ]
        ],
        "continent_rect": [
            [
                11204,
                4414
            ],
            [
                13252,
                6462
            ]
        ],
        "map_name": "Fractals of the Mists"
    },
    "1206": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": -31,
        "type": "Public",
        "floors": [
            -31
        ],
        "region_id": 26,
        "region_name": "Fractals of the Mists",
        "continent_id": 2,
        "continent_name": "Mists",
        "map_rect": [
            [
                -12288,
                -12288
            ],
            [
                12288,
                12288
            ]
        ],
        "continent_rect": [
            [
                46368,
                33520
            ],
            [
                48416,
                35568
            ]
        ],
        "map_name": "Mistlock Sanctuary"
    },
    "1207": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 3,
        "region_name": "Ruins of Orr",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -39936,
                -15360
            ],
            [
                39936,
                15360
            ]
        ],
        "continent_rect": [
            [
                47002,
                41600
            ],
            [
                50330,
                42880
            ]
        ],
        "map_name": "The Last Chance"
    },
    "1208": {
        "min_level": 0,
        "max_level": 80,
        "default_floor": -33,
        "type": "Instance",
        "floors": [
            -33
        ],
        "region_id": 4,
        "region_name": "Kryta",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -9216,
                -9216
            ],
            [
                9216,
                9216
            ]
        ],
        "continent_rect": [
            [
                44008,
                26440
            ],
            [
                44776,
                27208
            ]
        ],
        "map_name": "Shining Blade Headquarters"
    },
    "1209": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1,
            3,
            49,
            2,
            0
        ],
        "region_id": 12,
        "region_name": "Crystal Desert",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -61440,
                -30720
            ],
            [
                61440,
                30720
            ]
        ],
        "continent_rect": [
            [
                57256,
                39744
            ],
            [
                62376,
                42304
            ]
        ],
        "map_name": "The Sacrifice"
    },
    "1210": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Public",
        "floors": [
            1,
            3,
            49,
            2,
            0
        ],
        "region_id": 12,
        "region_name": "Crystal Desert",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -61440,
                -30720
            ],
            [
                61440,
                30720
            ]
        ],
        "continent_rect": [
            [
                57256,
                42304
            ],
            [
                62376,
                44864
            ]
        ],
        "map_name": "Crystal Oasis"
    },
    "1211": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Public",
        "floors": [
            1,
            3,
            49,
            2,
            0
        ],
        "region_id": 12,
        "region_name": "Crystal Desert",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -61440,
                -30720
            ],
            [
                61440,
                30720
            ]
        ],
        "continent_rect": [
            [
                57256,
                39744
            ],
            [
                62376,
                42304
            ]
        ],
        "map_name": "Desert Highlands"
    },
    "1212": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1,
            3,
            49,
            2,
            0
        ],
        "region_id": 12,
        "region_name": "Crystal Desert",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -61440,
                -30720
            ],
            [
                61440,
                30720
            ]
        ],
        "continent_rect": [
            [
                57256,
                42304
            ],
            [
                62376,
                44864
            ]
        ],
        "map_name": "Office of the Chief Councilor"
    },
    "1214": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1,
            49
        ],
        "region_id": 12,
        "region_name": "Crystal Desert",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -15360,
                -15360
            ],
            [
                15360,
                15360
            ]
        ],
        "continent_rect": [
            [
                64016,
                51072
            ],
            [
                65296,
                52352
            ]
        ],
        "map_name": "Windswept Haven"
    },
    "1215": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Public",
        "floors": [
            1,
            3,
            49,
            2,
            0
        ],
        "region_id": 12,
        "region_name": "Crystal Desert",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -15360,
                -15360
            ],
            [
                15360,
                15360
            ]
        ],
        "continent_rect": [
            [
                64016,
                51072
            ],
            [
                65296,
                52352
            ]
        ],
        "map_name": "Windswept Haven"
    },
    "1217": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1,
            3,
            49,
            2,
            0
        ],
        "region_id": 12,
        "region_name": "Crystal Desert",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -61440,
                -30720
            ],
            [
                61440,
                30720
            ]
        ],
        "continent_rect": [
            [
                57256,
                42304
            ],
            [
                62376,
                44864
            ]
        ],
        "map_name": "Sparking the Flame"
    },
    "1219": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1,
            3,
            49,
            2,
            0
        ],
        "map_rect": [
            [
                -58368,
                -36864
            ],
            [
                58368,
                39936
            ]
        ],
        "continent_rect": [
            [
                63616,
                52352
            ],
            [
                68480,
                55552
            ]
        ],
        "map_name": "Enemy of My Enemy: The Beastmarshal"
    },
    "1220": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 12,
        "region_name": "Crystal Desert",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -27648,
                -18432
            ],
            [
                30720,
                18432
            ]
        ],
        "continent_rect": [
            [
                48000,
                30720
            ],
            [
                50432,
                32256
            ]
        ],
        "map_name": "Sparking the Flame (Prologue)"
    },
    "1221": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": -30,
        "type": "Instance",
        "floors": [
            -30
        ],
        "region_id": 12,
        "region_name": "Crystal Desert",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -33792,
                -27648
            ],
            [
                36864,
                30720
            ]
        ],
        "continent_rect": [
            [
                57968,
                44484
            ],
            [
                60912,
                46916
            ]
        ],
        "map_name": "The Way Forward"
    },
    "1222": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 49,
        "type": "Instance",
        "floors": [
            1,
            49
        ],
        "region_id": 12,
        "region_name": "Crystal Desert",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -15360,
                -15360
            ],
            [
                15360,
                15360
            ]
        ],
        "continent_rect": [
            [
                64016,
                51072
            ],
            [
                65296,
                52352
            ]
        ],
        "map_name": "Claiming Windswept Haven"
    },
    "1223": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1,
            3,
            49,
            2,
            0
        ],
        "region_id": 12,
        "region_name": "Crystal Desert",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -61440,
                -30720
            ],
            [
                61440,
                30720
            ]
        ],
        "continent_rect": [
            [
                57256,
                42304
            ],
            [
                62376,
                44864
            ]
        ],
        "map_name": "Small Victory (Epilogue)"
    },
    "1224": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1,
            49
        ],
        "region_id": 12,
        "region_name": "Crystal Desert",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -15360,
                -15360
            ],
            [
                15360,
                15360
            ]
        ],
        "continent_rect": [
            [
                64016,
                51072
            ],
            [
                65296,
                52352
            ]
        ],
        "map_name": "Windswept Haven"
    },
    "1226": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Public",
        "floors": [
            1,
            3,
            49,
            2,
            0
        ],
        "region_id": 12,
        "region_name": "Crystal Desert",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -43008,
                -61440
            ],
            [
                43008,
                61440
            ]
        ],
        "continent_rect": [
            [
                58240,
                48192
            ],
            [
                61824,
                53312
            ]
        ],
        "map_name": "The Desolation"
    },
    "1227": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1,
            3,
            49,
            2,
            0
        ],
        "region_id": 12,
        "region_name": "Crystal Desert",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -61440,
                -30720
            ],
            [
                61440,
                30720
            ]
        ],
        "continent_rect": [
            [
                57256,
                39744
            ],
            [
                62376,
                42304
            ]
        ],
        "map_name": "Hallowed Ground: Tomb of Primeval Kings"
    },
    "1228": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Public",
        "floors": [
            1,
            3,
            49,
            2,
            0
        ],
        "region_id": 12,
        "region_name": "Crystal Desert",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -43008,
                -39936
            ],
            [
                43008,
                43008
            ]
        ],
        "continent_rect": [
            [
                58240,
                44736
            ],
            [
                61824,
                48192
            ]
        ],
        "map_name": "Elon Riverlands"
    },
    "1230": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": -35,
        "type": "Instance",
        "floors": [
            -36,
            -35
        ],
        "region_id": 12,
        "region_name": "Crystal Desert",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -46080,
                -30720
            ],
            [
                46080,
                30720
            ]
        ],
        "continent_rect": [
            [
                60768,
                37384
            ],
            [
                64608,
                39944
            ]
        ],
        "map_name": "Facing the Truth: The Sanctum"
    },
    "1231": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 49,
        "type": "Instance",
        "floors": [
            1,
            49
        ],
        "region_id": 12,
        "region_name": "Crystal Desert",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -15360,
                -15360
            ],
            [
                15360,
                15360
            ]
        ],
        "continent_rect": [
            [
                64016,
                51072
            ],
            [
                65296,
                52352
            ]
        ],
        "map_name": "Claiming Windswept Haven"
    },
    "1232": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1,
            49
        ],
        "region_id": 12,
        "region_name": "Crystal Desert",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -15360,
                -15360
            ],
            [
                15360,
                15360
            ]
        ],
        "continent_rect": [
            [
                64016,
                51072
            ],
            [
                65296,
                52352
            ]
        ],
        "map_name": "Windswept Haven"
    },
    "1234": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1,
            3,
            49,
            2,
            0
        ],
        "region_id": 12,
        "region_name": "Crystal Desert",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -58368,
                -36864
            ],
            [
                58368,
                39936
            ]
        ],
        "continent_rect": [
            [
                63616,
                52352
            ],
            [
                68480,
                55552
            ]
        ],
        "map_name": "To Kill a God"
    },
    "1236": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 49,
        "type": "Instance",
        "floors": [
            1,
            49
        ],
        "region_id": 12,
        "region_name": "Crystal Desert",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -15360,
                -15360
            ],
            [
                15360,
                15360
            ]
        ],
        "continent_rect": [
            [
                64016,
                51072
            ],
            [
                65296,
                52352
            ]
        ],
        "map_name": "Claiming Windswept Haven"
    },
    "1240": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1,
            3,
            49,
            2,
            0
        ],
        "region_id": 12,
        "region_name": "Crystal Desert",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -61440,
                -30720
            ],
            [
                61440,
                30720
            ]
        ],
        "continent_rect": [
            [
                57256,
                42304
            ],
            [
                62376,
                44864
            ]
        ],
        "map_name": "Blazing a Trail"
    },
    "1241": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1,
            3,
            49,
            2,
            0
        ],
        "region_id": 12,
        "region_name": "Crystal Desert",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -61440,
                -30720
            ],
            [
                61440,
                30720
            ]
        ],
        "continent_rect": [
            [
                57256,
                42304
            ],
            [
                62376,
                44864
            ]
        ],
        "map_name": "Night of Fires"
    },
    "1242": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1,
            3,
            49,
            2,
            0
        ],
        "region_id": 12,
        "region_name": "Crystal Desert",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -61440,
                -30720
            ],
            [
                61440,
                30720
            ]
        ],
        "continent_rect": [
            [
                57256,
                42304
            ],
            [
                62376,
                44864
            ]
        ],
        "map_name": "Zalambur's Office"
    },
    "1243": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1,
            49
        ],
        "region_id": 12,
        "region_name": "Crystal Desert",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -15360,
                -15360
            ],
            [
                15360,
                15360
            ]
        ],
        "continent_rect": [
            [
                64016,
                51072
            ],
            [
                65296,
                52352
            ]
        ],
        "map_name": "Windswept Haven"
    },
    "1244": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 49,
        "type": "Instance",
        "floors": [
            1,
            49
        ],
        "region_id": 12,
        "region_name": "Crystal Desert",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -15360,
                -15360
            ],
            [
                15360,
                15360
            ]
        ],
        "continent_rect": [
            [
                64016,
                51072
            ],
            [
                65296,
                52352
            ]
        ],
        "map_name": "Claiming Windswept Haven"
    },
    "1245": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1,
            41,
            2,
            0,
            3,
            49
        ],
        "region_id": 12,
        "region_name": "Crystal Desert",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -33792,
                -27648
            ],
            [
                36864,
                30720
            ]
        ],
        "continent_rect": [
            [
                56963,
                46274
            ],
            [
                59907,
                48706
            ]
        ],
        "map_name": "The Departing"
    },
    "1246": {
        "min_level": 0,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 4,
        "region_name": "Kryta",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -27648,
                -18432
            ],
            [
                30720,
                18432
            ]
        ],
        "continent_rect": [
            [
                48000,
                30720
            ],
            [
                50432,
                32256
            ]
        ],
        "map_name": "Captain Kiel's Office"
    },
    "1247": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1,
            3,
            49,
            2,
            0
        ],
        "map_rect": [
            [
                -43008,
                -61440
            ],
            [
                43008,
                61440
            ]
        ],
        "continent_rect": [
            [
                58240,
                48192
            ],
            [
                61824,
                53312
            ]
        ],
        "map_name": "Enemy of My Enemy"
    },
    "1248": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Public",
        "floors": [
            1,
            3,
            49,
            2,
            0
        ],
        "region_id": 12,
        "region_name": "Crystal Desert",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -58368,
                -36864
            ],
            [
                58368,
                39936
            ]
        ],
        "continent_rect": [
            [
                63616,
                52352
            ],
            [
                68480,
                55552
            ]
        ],
        "map_name": "Domain of Vabbi"
    },
    "1250": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1,
            49
        ],
        "region_id": 12,
        "region_name": "Crystal Desert",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -15360,
                -15360
            ],
            [
                15360,
                15360
            ]
        ],
        "continent_rect": [
            [
                64016,
                51072
            ],
            [
                65296,
                52352
            ]
        ],
        "map_name": "Windswept Haven"
    },
    "1252": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            -29,
            1,
            2,
            0,
            3,
            49
        ],
        "region_id": 12,
        "region_name": "Crystal Desert",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -61440,
                -30720
            ],
            [
                61440,
                30720
            ]
        ],
        "continent_rect": [
            [
                57256,
                39744
            ],
            [
                62376,
                42304
            ]
        ],
        "map_name": "Crystalline Memories"
    },
    "1253": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1,
            3,
            49,
            2,
            0
        ],
        "region_id": 12,
        "region_name": "Crystal Desert",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -58368,
                -36864
            ],
            [
                58368,
                39936
            ]
        ],
        "continent_rect": [
            [
                63616,
                52352
            ],
            [
                68480,
                55552
            ]
        ],
        "map_name": "Beast of War"
    },
    "1255": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1,
            3,
            49,
            2,
            0
        ],
        "map_rect": [
            [
                -58368,
                -36864
            ],
            [
                58368,
                39936
            ]
        ],
        "continent_rect": [
            [
                63616,
                52352
            ],
            [
                68480,
                55552
            ]
        ],
        "map_name": "Enemy of My Enemy: The Troopmarshal"
    },
    "1256": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": -36,
        "type": "Instance",
        "floors": [
            -36
        ],
        "region_id": 12,
        "region_name": "Crystal Desert",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -46080,
                -30720
            ],
            [
                46080,
                30720
            ]
        ],
        "continent_rect": [
            [
                60768,
                37384
            ],
            [
                64608,
                39944
            ]
        ],
        "map_name": "The Dark Library"
    },
    "1257": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1,
            3,
            49,
            2,
            0
        ],
        "region_id": 12,
        "region_name": "Crystal Desert",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -58368,
                -36864
            ],
            [
                58368,
                39936
            ]
        ],
        "continent_rect": [
            [
                63616,
                52352
            ],
            [
                68480,
                55552
            ]
        ],
        "map_name": "Spearmarshal's Lament"
    },
    "1260": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1,
            49
        ],
        "region_id": 12,
        "region_name": "Crystal Desert",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -30720,
                -21504
            ],
            [
                30720,
                21504
            ]
        ],
        "continent_rect": [
            [
                57768,
                43069
            ],
            [
                60328,
                44861
            ]
        ],
        "map_name": "Eye of the Brandstorm"
    },
    "1263": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Public",
        "floors": [
            1,
            3,
            2,
            0
        ],
        "region_id": 12,
        "region_name": "Crystal Desert",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -46080,
                -46080
            ],
            [
                46080,
                46080
            ]
        ],
        "continent_rect": [
            [
                55318,
                59916
            ],
            [
                59158,
                63756
            ]
        ],
        "map_name": "Domain of Istan"
    },
    "1264": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": -32,
        "type": "Instance",
        "floors": [
            -32
        ],
        "region_id": 12,
        "region_name": "Crystal Desert",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -21504,
                -12288
            ],
            [
                24576,
                12288
            ]
        ],
        "continent_rect": [
            [
                51840,
                31868
            ],
            [
                53760,
                32892
            ]
        ],
        "map_name": "Hall of Chains"
    },
    "1265": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1,
            49,
            0
        ],
        "region_id": 12,
        "region_name": "Crystal Desert",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -46080,
                -46080
            ],
            [
                46080,
                46080
            ]
        ],
        "continent_rect": [
            [
                55318,
                59916
            ],
            [
                59158,
                63756
            ]
        ],
        "map_name": "The Hero of Istan"
    },
    "1266": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1,
            49,
            0
        ],
        "region_id": 12,
        "region_name": "Crystal Desert",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -46080,
                -46080
            ],
            [
                46080,
                46080
            ]
        ],
        "continent_rect": [
            [
                55318,
                59916
            ],
            [
                59158,
                63756
            ]
        ],
        "map_name": "Cave of the Sunspear Champion"
    },
    "1267": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 12,
        "type": "Instance",
        "floors": [
            12
        ],
        "region_id": 26,
        "region_name": "Fractals of the Mists",
        "continent_id": 2,
        "continent_name": "Mists",
        "map_rect": [
            [
                -12288,
                -12288
            ],
            [
                12288,
                12288
            ]
        ],
        "continent_rect": [
            [
                11716,
                4346
            ],
            [
                13764,
                6394
            ]
        ],
        "map_name": "Fractals of the Mists"
    },
    "1268": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1,
            0
        ],
        "region_id": 12,
        "region_name": "Crystal Desert",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -15360,
                -15360
            ],
            [
                15360,
                15360
            ]
        ],
        "continent_rect": [
            [
                52304,
                61488
            ],
            [
                53584,
                62768
            ]
        ],
        "map_name": "Fahranur, the First City"
    },
    "1270": {
        "min_level": 0,
        "max_level": 80,
        "default_floor": 17,
        "type": "Instance",
        "floors": [
            17
        ],
        "region_id": 27,
        "region_name": "Wintersday Celebration",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -9216,
                -9216
            ],
            [
                9216,
                9216
            ]
        ],
        "continent_rect": [
            [
                43008,
                26740
            ],
            [
                43776,
                27508
            ]
        ],
        "map_name": "Toypocalypse"
    },
    "1271": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Public",
        "floors": [
            1,
            3,
            49,
            2,
            0
        ],
        "region_id": 12,
        "region_name": "Crystal Desert",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -36864,
                -52224
            ],
            [
                39936,
                52224
            ]
        ],
        "continent_rect": [
            [
                51994,
                55402
            ],
            [
                55194,
                59754
            ]
        ],
        "map_name": "Sandswept Isles"
    },
    "1274": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 50,
        "type": "Instance",
        "floors": [
            50
        ],
        "region_id": 12,
        "region_name": "Crystal Desert",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -36864,
                -52224
            ],
            [
                39936,
                52224
            ]
        ],
        "continent_rect": [
            [
                51994,
                55402
            ],
            [
                55194,
                59754
            ]
        ],
        "map_name": "The Charge"
    },
    "1275": {
        "min_level": 0,
        "max_level": 0,
        "default_floor": 32,
        "type": "Pvp",
        "floors": [
            32
        ],
        "region_id": 6,
        "region_name": "Player vs. Player",
        "continent_id": 2,
        "continent_name": "Mists",
        "map_rect": [
            [
                -12288,
                -12288
            ],
            [
                12288,
                12288
            ]
        ],
        "continent_rect": [
            [
                2048,
                7040
            ],
            [
                3072,
                8064
            ]
        ],
        "map_name": "Courtyard"
    },
    "1276": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1,
            3,
            49,
            2,
            0
        ],
        "region_id": 12,
        "region_name": "Crystal Desert",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -36864,
                -52224
            ],
            [
                39936,
                52224
            ]
        ],
        "continent_rect": [
            [
                51994,
                55402
            ],
            [
                55194,
                59754
            ]
        ],
        "map_name": "The Test Subject"
    },
    "1277": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 50,
        "type": "Instance",
        "floors": [
            50
        ],
        "region_id": 12,
        "region_name": "Crystal Desert",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -36864,
                -52224
            ],
            [
                39936,
                52224
            ]
        ],
        "continent_rect": [
            [
                51994,
                55402
            ],
            [
                55194,
                59754
            ]
        ],
        "map_name": "The Charge"
    },
    "1278": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1,
            48
        ],
        "region_id": 4,
        "region_name": "Kryta",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -36864,
                -36864
            ],
            [
                36864,
                36864
            ]
        ],
        "continent_rect": [
            [
                53504,
                24576
            ],
            [
                56576,
                27648
            ]
        ],
        "map_name": "???"
    },
    "1279": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": -37,
        "type": "Instance",
        "floors": [
            -37
        ],
        "region_id": 12,
        "region_name": "Crystal Desert",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -24576,
                -24576
            ],
            [
                24576,
                24576
            ]
        ],
        "continent_rect": [
            [
                43972,
                20798
            ],
            [
                46020,
                22846
            ]
        ],
        "map_name": "ERROR: SIGNAL LOST"
    },
    "1281": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1,
            49
        ],
        "region_id": 12,
        "region_name": "Crystal Desert",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -36864,
                -52224
            ],
            [
                39936,
                52224
            ]
        ],
        "continent_rect": [
            [
                51994,
                55402
            ],
            [
                55194,
                59754
            ]
        ],
        "map_name": "A Kindness Repaid"
    },
    "1282": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1,
            49
        ],
        "region_id": 12,
        "region_name": "Crystal Desert",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -15360,
                -21504
            ],
            [
                15360,
                24576
            ]
        ],
        "continent_rect": [
            [
                59686,
                40139
            ],
            [
                60966,
                42059
            ]
        ],
        "map_name": "Tracking the Scientist"
    },
    "1283": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 5,
        "region_name": "Tarnished Coast",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -46080,
                -27648
            ],
            [
                46080,
                30720
            ]
        ],
        "continent_rect": [
            [
                50560,
                37760
            ],
            [
                54400,
                40192
            ]
        ],
        "map_name": "???"
    },
    "1285": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 4,
        "region_name": "Kryta",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -21504,
                -21504
            ],
            [
                24576,
                21504
            ]
        ],
        "continent_rect": [
            [
                43008,
                26240
            ],
            [
                44928,
                28032
            ]
        ],
        "map_name": "???"
    },
    "1288": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Public",
        "floors": [
            1,
            3,
            49,
            2,
            0
        ],
        "region_id": 12,
        "region_name": "Crystal Desert",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -49152,
                -55296
            ],
            [
                49152,
                58368
            ]
        ],
        "continent_rect": [
            [
                63624,
                59572
            ],
            [
                67720,
                64308
            ]
        ],
        "map_name": "Domain of Kourna"
    },
    "1289": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1,
            49
        ],
        "region_id": 12,
        "region_name": "Crystal Desert",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -30720,
                -30720
            ],
            [
                30720,
                30720
            ]
        ],
        "continent_rect": [
            [
                57256,
                42304
            ],
            [
                59816,
                44864
            ]
        ],
        "map_name": "Seized"
    },
    "1290": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 31,
        "type": "Instance",
        "floors": [
            31
        ],
        "region_id": 26,
        "region_name": "Fractals of the Mists",
        "continent_id": 2,
        "continent_name": "Mists",
        "map_rect": [
            [
                -21504,
                -21504
            ],
            [
                21504,
                21504
            ]
        ],
        "continent_rect": [
            [
                11804,
                4414
            ],
            [
                13596,
                6206
            ]
        ],
        "map_name": "Fractals of the Mists"
    },
    "1291": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 53,
        "type": "Instance",
        "floors": [
            53
        ],
        "region_id": 12,
        "region_name": "Crystal Desert",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -49152,
                -55296
            ],
            [
                49152,
                58368
            ]
        ],
        "continent_rect": [
            [
                63624,
                59572
            ],
            [
                67720,
                64308
            ]
        ],
        "map_name": "Forearmed Is Forewarned"
    },
    "1292": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1,
            49
        ],
        "region_id": 12,
        "region_name": "Crystal Desert",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -49152,
                -55296
            ],
            [
                49152,
                58368
            ]
        ],
        "continent_rect": [
            [
                63624,
                59572
            ],
            [
                67720,
                64308
            ]
        ],
        "map_name": "Be My Guest"
    },
    "1294": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1,
            49
        ],
        "region_id": 12,
        "region_name": "Crystal Desert",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -49152,
                -36864
            ],
            [
                49152,
                39936
            ]
        ],
        "continent_rect": [
            [
                63316,
                56376
            ],
            [
                67412,
                59576
            ]
        ],
        "map_name": "Sun's Refuge"
    },
    "1295": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1,
            49
        ],
        "region_id": 12,
        "region_name": "Crystal Desert",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -49152,
                -36864
            ],
            [
                49152,
                39936
            ]
        ],
        "continent_rect": [
            [
                63316,
                56376
            ],
            [
                67412,
                59576
            ]
        ],
        "map_name": "Legacy"
    },
    "1296": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 51,
        "type": "Instance",
        "floors": [
            51
        ],
        "region_id": 26,
        "region_name": "Fractals of the Mists",
        "continent_id": 2,
        "continent_name": "Mists",
        "map_rect": [
            [
                -36864,
                -52224
            ],
            [
                39936,
                55296
            ]
        ],
        "continent_rect": [
            [
                60768,
                37384
            ],
            [
                63968,
                41864
            ]
        ],
        "map_name": "Storm Tracking"
    },
    "1297": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1,
            49
        ],
        "region_id": 12,
        "region_name": "Crystal Desert",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -49152,
                -36864
            ],
            [
                49152,
                39936
            ]
        ],
        "continent_rect": [
            [
                63316,
                56376
            ],
            [
                67412,
                59576
            ]
        ],
        "map_name": "A Shattered Nation"
    },
    "1299": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1,
            49
        ],
        "region_id": 12,
        "region_name": "Crystal Desert",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -49152,
                -36864
            ],
            [
                49152,
                39936
            ]
        ],
        "continent_rect": [
            [
                63316,
                56376
            ],
            [
                67412,
                59576
            ]
        ],
        "map_name": "Storm Tracking"
    },
    "1300": {
        "min_level": 0,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1,
            49
        ],
        "region_id": 12,
        "region_name": "Crystal Desert",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -49152,
                -36864
            ],
            [
                49152,
                39936
            ]
        ],
        "continent_rect": [
            [
                63316,
                56376
            ],
            [
                67412,
                59576
            ]
        ],
        "map_name": "From the Ashes\u2014The Deadeye"
    },
    "1301": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Public",
        "floors": [
            1,
            3,
            49,
            2,
            0
        ],
        "region_id": 12,
        "region_name": "Crystal Desert",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -49152,
                -36864
            ],
            [
                49152,
                39936
            ]
        ],
        "continent_rect": [
            [
                63316,
                56376
            ],
            [
                67412,
                59576
            ]
        ],
        "map_name": "Jahai Bluffs"
    },
    "1302": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1,
            49
        ],
        "region_id": 12,
        "region_name": "Crystal Desert",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -49152,
                -36864
            ],
            [
                49152,
                39936
            ]
        ],
        "continent_rect": [
            [
                63316,
                56376
            ],
            [
                67412,
                59576
            ]
        ],
        "map_name": "Storm Tracking"
    },
    "1303": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": -38,
        "type": "Instance",
        "floors": [
            -38
        ],
        "region_id": 12,
        "region_name": "Crystal Desert",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -21504,
                -21504
            ],
            [
                24576,
                24576
            ]
        ],
        "continent_rect": [
            [
                46208,
                30720
            ],
            [
                48128,
                32640
            ]
        ],
        "map_name": "Mythwright Gambit"
    },
    "1304": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": -34,
        "type": "Public",
        "floors": [
            -34
        ],
        "region_id": 25,
        "region_name": "Mad King's Realm",
        "continent_id": 2,
        "continent_name": "Mists",
        "map_rect": [
            [
                -9216,
                -9216
            ],
            [
                9216,
                9216
            ]
        ],
        "continent_rect": [
            [
                2944,
                13440
            ],
            [
                3712,
                14208
            ]
        ],
        "map_name": "Mad King's Raceway"
    },
    "1305": {
        "min_level": 0,
        "max_level": 0,
        "default_floor": 44,
        "type": "Pvp",
        "floors": [
            1,
            44
        ],
        "region_id": 6,
        "region_name": "Player vs. Player",
        "continent_id": 2,
        "continent_name": "Mists",
        "map_rect": [
            [
                -24576,
                -12288
            ],
            [
                24576,
                12288
            ]
        ],
        "continent_rect": [
            [
                11812,
                5488
            ],
            [
                13860,
                6512
            ]
        ],
        "map_name": "Djinn's Dominion"
    },
    "1306": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": -39,
        "type": "Instance",
        "floors": [
            -39
        ],
        "map_rect": [
            [
                -15360,
                -15360
            ],
            [
                15360,
                15360
            ]
        ],
        "continent_rect": [
            [
                52268,
                24384
            ],
            [
                53548,
                25664
            ]
        ],
        "map_name": "Secret Lair of the Snowmen (Squad)"
    },
    "1308": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": -56,
        "type": "Instance",
        "floors": [
            -55,
            -56
        ],
        "region_id": 1,
        "region_name": "Shiverpeak Mountains",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -15360,
                -24576
            ],
            [
                15360,
                27648
            ]
        ],
        "continent_rect": [
            [
                52752,
                31958
            ],
            [
                54032,
                34134
            ]
        ],
        "map_name": "Scion & Champion"
    },
    "1309": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 11,
        "type": "Instance",
        "floors": [
            11
        ],
        "region_id": 26,
        "region_name": "Fractals of the Mists",
        "continent_id": 2,
        "continent_name": "Mists",
        "map_rect": [
            [
                -21504,
                -21504
            ],
            [
                24576,
                24576
            ]
        ],
        "continent_rect": [
            [
                11804,
                4414
            ],
            [
                13724,
                6334
            ]
        ],
        "map_name": "Fractals of the Mists"
    },
    "1310": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Public",
        "floors": [
            1,
            3,
            2,
            0
        ],
        "region_id": 1,
        "region_name": "Shiverpeak Mountains",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -39936,
                -43008
            ],
            [
                39936,
                46080
            ]
        ],
        "continent_rect": [
            [
                55820,
                34936
            ],
            [
                59148,
                38648
            ]
        ],
        "map_name": "Thunderhead Peaks"
    },
    "1313": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": -53,
        "type": "Instance",
        "floors": [
            -53
        ],
        "region_id": 1,
        "region_name": "Shiverpeak Mountains",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -27648,
                -18432
            ],
            [
                27648,
                18432
            ]
        ],
        "continent_rect": [
            [
                55418,
                35200
            ],
            [
                57722,
                36736
            ]
        ],
        "map_name": "The Crystal Dragon"
    },
    "1314": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": -53,
        "type": "Instance",
        "floors": [
            -53
        ],
        "region_id": 1,
        "region_name": "Shiverpeak Mountains",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -27648,
                -18432
            ],
            [
                27648,
                18432
            ]
        ],
        "continent_rect": [
            [
                55418,
                35200
            ],
            [
                57722,
                36736
            ]
        ],
        "map_name": "The Crystal Blooms"
    },
    "1315": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 3,
        "type": "Unknown",
        "floors": [
            3
        ],
        "region_id": 7,
        "region_name": "World vs. World",
        "continent_id": 2,
        "continent_name": "Mists",
        "map_rect": [
            [
                -21504,
                -21504
            ],
            [
                21504,
                21504
            ]
        ],
        "continent_rect": [
            [
                13798,
                8646
            ],
            [
                15590,
                10438
            ]
        ],
        "map_name": "Armistice Bastion"
    },
    "1316": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": -35,
        "type": "Public",
        "floors": [
            -35
        ],
        "region_id": 25,
        "region_name": "Mad King's Realm",
        "continent_id": 2,
        "continent_name": "Mists",
        "map_rect": [
            [
                -6144,
                -6144
            ],
            [
                9216,
                9216
            ]
        ],
        "continent_rect": [
            [
                2944,
                13440
            ],
            [
                3584,
                14080
            ]
        ],
        "map_name": "Mists Rift"
    },
    "1317": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Public",
        "floors": [
            1,
            3,
            49,
            2,
            0
        ],
        "region_id": 12,
        "region_name": "Crystal Desert",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -39936,
                -33792
            ],
            [
                43008,
                33792
            ]
        ],
        "continent_rect": [
            [
                43968,
                48384
            ],
            [
                47424,
                51200
            ]
        ],
        "map_name": "Dragonfall"
    },
    "1318": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1,
            49
        ],
        "region_id": 12,
        "region_name": "Crystal Desert",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -39936,
                -33792
            ],
            [
                43008,
                33792
            ]
        ],
        "continent_rect": [
            [
                43968,
                48384
            ],
            [
                47424,
                51200
            ]
        ],
        "map_name": "Dragonfall"
    },
    "1319": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": -57,
        "type": "Instance",
        "floors": [
            -57
        ],
        "region_id": 12,
        "region_name": "Crystal Desert",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -21504,
                -21504
            ],
            [
                24576,
                24576
            ]
        ],
        "continent_rect": [
            [
                45068,
                51084
            ],
            [
                46988,
                53004
            ]
        ],
        "map_name": "Descent"
    },
    "1320": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": -53,
        "type": "Instance",
        "floors": [
            -53
        ],
        "region_id": 12,
        "region_name": "Crystal Desert",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -27648,
                -18432
            ],
            [
                27648,
                18432
            ]
        ],
        "continent_rect": [
            [
                55418,
                35200
            ],
            [
                57722,
                36736
            ]
        ],
        "map_name": "The End"
    },
    "1321": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": -52,
        "type": "Instance",
        "floors": [
            -52
        ],
        "region_id": 12,
        "region_name": "Crystal Desert",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -24576,
                -24576
            ],
            [
                24576,
                24576
            ]
        ],
        "continent_rect": [
            [
                27000,
                21000
            ],
            [
                29048,
                23048
            ]
        ],
        "map_name": "Dragonflight"
    },
    "1322": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 54,
        "type": "Instance",
        "floors": [
            54
        ],
        "region_id": 12,
        "region_name": "Crystal Desert",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -9216,
                -9216
            ],
            [
                9216,
                9216
            ]
        ],
        "continent_rect": [
            [
                45638,
                47135
            ],
            [
                46406,
                47903
            ]
        ],
        "map_name": "Epilogue"
    },
    "1323": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1,
            3,
            49,
            2,
            0
        ],
        "region_id": 12,
        "region_name": "Crystal Desert",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -21504,
                -21504
            ],
            [
                24576,
                24576
            ]
        ],
        "continent_rect": [
            [
                66298,
                50434
            ],
            [
                68218,
                52354
            ]
        ],
        "map_name": "The Key of Ahdashim"
    },
    "1326": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Public",
        "floors": [
            1,
            3,
            2,
            0
        ],
        "region_id": 1,
        "region_name": "Shiverpeak Mountains",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -27648,
                -18432
            ],
            [
                27648,
                21504
            ]
        ],
        "continent_rect": [
            [
                52224,
                29696
            ],
            [
                54528,
                31360
            ]
        ],
        "map_name": "Dragon Bash Arena"
    },
    "1327": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1,
            3,
            2,
            0
        ],
        "region_id": 1,
        "region_name": "Shiverpeak Mountains",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -27648,
                -18432
            ],
            [
                27648,
                21504
            ]
        ],
        "continent_rect": [
            [
                52224,
                29696
            ],
            [
                54528,
                31360
            ]
        ],
        "map_name": "Dragon Arena Survival"
    },
    "1328": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 41,
        "type": "Pvp",
        "floors": [
            1,
            41
        ],
        "region_id": 6,
        "region_name": "Player vs. Player",
        "continent_id": 2,
        "continent_name": "Mists",
        "map_rect": [
            [
                -18432,
                -18432
            ],
            [
                18432,
                18432
            ]
        ],
        "continent_rect": [
            [
                9104,
                4834
            ],
            [
                10640,
                6370
            ]
        ],
        "map_name": "Auric Span"
    },
    "1329": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 2,
        "region_name": "Ascalon",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -36864,
                -30720
            ],
            [
                39936,
                30720
            ]
        ],
        "continent_rect": [
            [
                59392,
                17504
            ],
            [
                62592,
                20064
            ]
        ],
        "map_name": "Coming Home"
    },
    "1330": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Public",
        "floors": [
            1,
            3,
            2,
            0
        ],
        "region_id": 2,
        "region_name": "Ascalon",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -36864,
                -30720
            ],
            [
                39936,
                30720
            ]
        ],
        "continent_rect": [
            [
                59392,
                17504
            ],
            [
                62592,
                20064
            ]
        ],
        "map_name": "Grothmar Valley"
    },
    "1331": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Public",
        "floors": [
            1
        ],
        "region_id": 2,
        "region_name": "Ascalon",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -36864,
                -30720
            ],
            [
                39936,
                30720
            ]
        ],
        "continent_rect": [
            [
                59392,
                17504
            ],
            [
                62592,
                20064
            ]
        ],
        "map_name": "Strike Mission: Shiverpeaks Pass (Public)"
    },
    "1332": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 2,
        "region_name": "Ascalon",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -36864,
                -30720
            ],
            [
                39936,
                30720
            ]
        ],
        "continent_rect": [
            [
                59392,
                17504
            ],
            [
                62592,
                20064
            ]
        ],
        "map_name": "Strike Mission: Shiverpeaks Pass (Squad)"
    },
    "1334": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 2,
        "region_name": "Ascalon",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -36864,
                -30720
            ],
            [
                39936,
                30720
            ]
        ],
        "continent_rect": [
            [
                59392,
                17504
            ],
            [
                62592,
                20064
            ]
        ],
        "map_name": "Deeper and Deeper"
    },
    "1336": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 2,
        "region_name": "Ascalon",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -36864,
                -30720
            ],
            [
                39936,
                30720
            ]
        ],
        "continent_rect": [
            [
                59392,
                17504
            ],
            [
                62592,
                20064
            ]
        ],
        "map_name": "A Race to Arms"
    },
    "1338": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 2,
        "region_name": "Ascalon",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -36864,
                -30720
            ],
            [
                39936,
                30720
            ]
        ],
        "continent_rect": [
            [
                59392,
                17504
            ],
            [
                62592,
                20064
            ]
        ],
        "map_name": "Bad Blood"
    },
    "1339": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 61,
        "type": "Instance",
        "floors": [
            61
        ],
        "region_id": 1,
        "region_name": "Shiverpeak Mountains",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -12288,
                -12288
            ],
            [
                12288,
                12288
            ]
        ],
        "continent_rect": [
            [
                56712,
                17494
            ],
            [
                57729,
                18511
            ]
        ],
        "map_name": "Weekly Strike Mission: Boneskinner (Squad)"
    },
    "1340": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 62,
        "type": "Public",
        "floors": [
            62
        ],
        "region_id": 1,
        "region_name": "Shiverpeak Mountains",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -12288,
                -12288
            ],
            [
                12288,
                12288
            ]
        ],
        "continent_rect": [
            [
                56712,
                17494
            ],
            [
                57729,
                18511
            ]
        ],
        "map_name": "Weekly Strike Mission: Voice of the Fallen and Claw of the Fallen (Public)"
    },
    "1341": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 60,
        "type": "Instance",
        "floors": [
            60
        ],
        "region_id": 1,
        "region_name": "Shiverpeak Mountains",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -12288,
                -12288
            ],
            [
                12288,
                12288
            ]
        ],
        "continent_rect": [
            [
                56712,
                17494
            ],
            [
                57729,
                18511
            ]
        ],
        "map_name": "Weekly Strike Mission: Fraenir of Jormag (Squad)"
    },
    "1342": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 1,
        "region_name": "Shiverpeak Mountains",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -52224,
                -24576
            ],
            [
                55296,
                27648
            ]
        ],
        "continent_rect": [
            [
                54911,
                16972
            ],
            [
                59391,
                19148
            ]
        ],
        "map_name": "The Invitation"
    },
    "1343": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Public",
        "floors": [
            1,
            3,
            2,
            0
        ],
        "region_id": 1,
        "region_name": "Shiverpeak Mountains",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -52224,
                -24576
            ],
            [
                55296,
                27648
            ]
        ],
        "continent_rect": [
            [
                54911,
                16972
            ],
            [
                59391,
                19148
            ]
        ],
        "map_name": "Bjora Marches"
    },
    "1344": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 60,
        "type": "Public",
        "floors": [
            60
        ],
        "region_id": 1,
        "region_name": "Shiverpeak Mountains",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -12288,
                -12288
            ],
            [
                12288,
                12288
            ]
        ],
        "continent_rect": [
            [
                56712,
                17494
            ],
            [
                57729,
                18511
            ]
        ],
        "map_name": "Weekly Strike Mission: Fraenir of Jormag (Public)"
    },
    "1345": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 1,
        "region_name": "Shiverpeak Mountains",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -52224,
                -24576
            ],
            [
                55296,
                27648
            ]
        ],
        "continent_rect": [
            [
                54911,
                16972
            ],
            [
                59391,
                19148
            ]
        ],
        "map_name": "What's Left Behind"
    },
    "1346": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 62,
        "type": "Instance",
        "floors": [
            62
        ],
        "region_id": 1,
        "region_name": "Shiverpeak Mountains",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -12288,
                -12288
            ],
            [
                12288,
                12288
            ]
        ],
        "continent_rect": [
            [
                56712,
                17494
            ],
            [
                57729,
                18511
            ]
        ],
        "map_name": "Weekly Strike Mission: Voice of the Fallen and Claw of the Fallen (Squad)"
    },
    "1349": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 1,
        "region_name": "Shiverpeak Mountains",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -52224,
                -24576
            ],
            [
                55296,
                27648
            ]
        ],
        "continent_rect": [
            [
                54911,
                16972
            ],
            [
                59391,
                19148
            ]
        ],
        "map_name": "Silence"
    },
    "1351": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 61,
        "type": "Public",
        "floors": [
            61
        ],
        "region_id": 1,
        "region_name": "Shiverpeak Mountains",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -12288,
                -12288
            ],
            [
                12288,
                12288
            ]
        ],
        "continent_rect": [
            [
                56712,
                17494
            ],
            [
                57729,
                18511
            ]
        ],
        "map_name": "Weekly Strike Mission: Boneskinner (Public)"
    },
    "1352": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": -39,
        "type": "Public",
        "floors": [
            -39
        ],
        "map_rect": [
            [
                -15360,
                -15360
            ],
            [
                15360,
                15360
            ]
        ],
        "continent_rect": [
            [
                52268,
                24384
            ],
            [
                53548,
                25664
            ]
        ],
        "map_name": "Secret Lair of the Snowmen (Public)"
    },
    "1353": {
        "min_level": 0,
        "max_level": 80,
        "default_floor": 2,
        "type": "Public",
        "floors": [
            2
        ],
        "region_id": 4,
        "region_name": "Kryta",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -21504,
                -21504
            ],
            [
                24576,
                21504
            ]
        ],
        "continent_rect": [
            [
                43008,
                26240
            ],
            [
                44928,
                28032
            ]
        ],
        "map_name": "Celestial Challenge"
    },
    "1355": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": -40,
        "type": "Instance",
        "floors": [
            -40
        ],
        "region_id": 1,
        "region_name": "Shiverpeak Mountains",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -9216,
                -6144
            ],
            [
                9216,
                6144
            ]
        ],
        "continent_rect": [
            [
                55528,
                18980
            ],
            [
                56296,
                19492
            ]
        ],
        "map_name": "Voice in the Deep"
    },
    "1356": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1,
            3,
            2,
            0
        ],
        "region_id": 1,
        "region_name": "Shiverpeak Mountains",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -52224,
                -24576
            ],
            [
                55296,
                27648
            ]
        ],
        "continent_rect": [
            [
                54911,
                16972
            ],
            [
                59391,
                19148
            ]
        ],
        "map_name": "Chasing Ghosts"
    },
    "1357": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": -41,
        "type": "Public",
        "floors": [
            -41
        ],
        "region_id": 1,
        "region_name": "Shiverpeak Mountains",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -6144,
                -6144
            ],
            [
                6144,
                6144
            ]
        ],
        "continent_rect": [
            [
                55528,
                18980
            ],
            [
                56040,
                19492
            ]
        ],
        "map_name": "Strike Mission: Whisper of Jormag (Public)"
    },
    "1358": {
        "min_level": 0,
        "max_level": 0,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1,
            3,
            2,
            0
        ],
        "region_id": 1,
        "region_name": "Shiverpeak Mountains",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -15360,
                -15360
            ],
            [
                15360,
                15360
            ]
        ],
        "continent_rect": [
            [
                57344,
                21248
            ],
            [
                58624,
                22528
            ]
        ],
        "map_name": "Eye of the North"
    },
    "1359": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": -41,
        "type": "Instance",
        "floors": [
            -41
        ],
        "region_id": 1,
        "region_name": "Shiverpeak Mountains",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -6144,
                -6144
            ],
            [
                6144,
                6144
            ]
        ],
        "continent_rect": [
            [
                55528,
                18980
            ],
            [
                56040,
                19492
            ]
        ],
        "map_name": "Strike Mission: Whisper of Jormag (Squad)"
    },
    "1361": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 45,
        "type": "Instance",
        "floors": [
            45
        ],
        "region_id": 4,
        "region_name": "Kryta",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -49152,
                -24576
            ],
            [
                49152,
                24576
            ]
        ],
        "continent_rect": [
            [
                41344,
                30336
            ],
            [
                45440,
                32384
            ]
        ],
        "map_name": "The Nightmare Incarnate"
    },
    "1362": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 58,
        "type": "Public",
        "floors": [
            58
        ],
        "region_id": 1,
        "region_name": "Shiverpeak Mountains",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -18432,
                -24576
            ],
            [
                18432,
                24576
            ]
        ],
        "continent_rect": [
            [
                11432,
                3640
            ],
            [
                12968,
                5688
            ]
        ],
        "map_name": "Forging Steel (Public)"
    },
    "1363": {
        "min_level": 0,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 2,
        "region_name": "Ascalon",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -43008,
                -27648
            ],
            [
                43008,
                27648
            ]
        ],
        "continent_rect": [
            [
                56320,
                27648
            ],
            [
                59904,
                29952
            ]
        ],
        "map_name": "North Nolan Hatchery"
    },
    "1364": {
        "min_level": 0,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 1,
        "region_name": "Shiverpeak Mountains",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -30720,
                -30720
            ],
            [
                30720,
                30720
            ]
        ],
        "continent_rect": [
            [
                55296,
                26368
            ],
            [
                57856,
                28928
            ]
        ],
        "map_name": "Cragstead"
    },
    "1366": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": -42,
        "type": "Instance",
        "floors": [
            -42
        ],
        "region_id": 1,
        "region_name": "Shiverpeak Mountains",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -21504,
                -9216
            ],
            [
                24576,
                12288
            ]
        ],
        "continent_rect": [
            [
                51268,
                17184
            ],
            [
                53188,
                18080
            ]
        ],
        "map_name": "Darkrime Delves"
    },
    "1368": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 58,
        "type": "Instance",
        "floors": [
            58
        ],
        "region_id": 1,
        "region_name": "Shiverpeak Mountains",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -18432,
                -24576
            ],
            [
                18432,
                24576
            ]
        ],
        "continent_rect": [
            [
                11432,
                3640
            ],
            [
                12968,
                5688
            ]
        ],
        "map_name": "Forging Steel (Squad)"
    },
    "1369": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1,
            0
        ],
        "region_id": 4,
        "region_name": "Kryta",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -30720,
                -21504
            ],
            [
                33792,
                21504
            ]
        ],
        "continent_rect": [
            [
                44288,
                35328
            ],
            [
                46976,
                37120
            ]
        ],
        "map_name": "Canach's Lair"
    },
    "1370": {
        "min_level": 0,
        "max_level": 0,
        "default_floor": 1,
        "type": "Public",
        "floors": [
            1,
            3,
            2,
            0
        ],
        "region_id": 1,
        "region_name": "Shiverpeak Mountains",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -15360,
                -15360
            ],
            [
                15360,
                15360
            ]
        ],
        "continent_rect": [
            [
                57344,
                21248
            ],
            [
                58624,
                22528
            ]
        ],
        "map_name": "Eye of the North"
    },
    "1371": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Public",
        "floors": [
            1,
            3,
            2,
            0
        ],
        "region_id": 1,
        "region_name": "Shiverpeak Mountains",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -24576,
                -52224
            ],
            [
                27648,
                55296
            ]
        ],
        "continent_rect": [
            [
                50128,
                17809
            ],
            [
                52304,
                22289
            ]
        ],
        "map_name": "Drizzlewood Coast"
    },
    "1372": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1,
            2,
            0
        ],
        "region_id": 1,
        "region_name": "Shiverpeak Mountains",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -24576,
                -52224
            ],
            [
                27648,
                55296
            ]
        ],
        "continent_rect": [
            [
                50128,
                17809
            ],
            [
                52304,
                22289
            ]
        ],
        "map_name": "Turnabout"
    },
    "1373": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1,
            2,
            0
        ],
        "region_id": 1,
        "region_name": "Shiverpeak Mountains",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -24576,
                -52224
            ],
            [
                27648,
                55296
            ]
        ],
        "continent_rect": [
            [
                50128,
                17809
            ],
            [
                52304,
                22289
            ]
        ],
        "map_name": "Pointed Parley"
    },
    "1374": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": -43,
        "type": "Instance",
        "floors": [
            -43
        ],
        "region_id": 1,
        "region_name": "Shiverpeak Mountains",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -15360,
                -12288
            ],
            [
                15360,
                12288
            ]
        ],
        "continent_rect": [
            [
                50128,
                17809
            ],
            [
                51408,
                18833
            ]
        ],
        "map_name": "Strike Mission: Cold War (Squad)"
    },
    "1375": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1,
            2,
            0
        ],
        "region_id": 1,
        "region_name": "Shiverpeak Mountains",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -24576,
                -52224
            ],
            [
                27648,
                55296
            ]
        ],
        "continent_rect": [
            [
                50128,
                17809
            ],
            [
                52304,
                22289
            ]
        ],
        "map_name": "Snapping Steel"
    },
    "1376": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": -43,
        "type": "Public",
        "floors": [
            -43
        ],
        "region_id": 1,
        "region_name": "Shiverpeak Mountains",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -15360,
                -12288
            ],
            [
                15360,
                12288
            ]
        ],
        "continent_rect": [
            [
                50128,
                17809
            ],
            [
                51408,
                18833
            ]
        ],
        "map_name": "Strike Mission: Cold War (Public)"
    },
    "1378": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1,
            3,
            2,
            0
        ],
        "region_id": 1,
        "region_name": "Shiverpeak Mountains",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -24576,
                -52224
            ],
            [
                27648,
                55296
            ]
        ],
        "continent_rect": [
            [
                50128,
                17809
            ],
            [
                52304,
                22289
            ]
        ],
        "map_name": "Behind Enemy Lines"
    },
    "1379": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 0,
        "type": "Instance",
        "floors": [
            1,
            3,
            2,
            0
        ],
        "region_id": 1,
        "region_name": "Shiverpeak Mountains",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -24576,
                -52224
            ],
            [
                27648,
                55296
            ]
        ],
        "continent_rect": [
            [
                50128,
                17809
            ],
            [
                52304,
                22289
            ]
        ],
        "map_name": "One Charr, One Dragon, One Champion"
    },
    "1380": {
        "min_level": 0,
        "max_level": 0,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 1,
        "region_name": "Shiverpeak Mountains",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -15360,
                -15360
            ],
            [
                15360,
                15360
            ]
        ],
        "continent_rect": [
            [
                57344,
                21248
            ],
            [
                58624,
                22528
            ]
        ],
        "map_name": "Epilogue"
    },
    "1382": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1,
            3,
            2,
            0
        ],
        "region_id": 1,
        "region_name": "Shiverpeak Mountains",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -24576,
                -52224
            ],
            [
                27648,
                55296
            ]
        ],
        "continent_rect": [
            [
                50128,
                17809
            ],
            [
                52304,
                22289
            ]
        ],
        "map_name": "Arena of the Wolverine"
    },
    "1383": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1,
            3,
            2,
            0
        ],
        "region_id": 1,
        "region_name": "Shiverpeak Mountains",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -24576,
                -52224
            ],
            [
                27648,
                55296
            ]
        ],
        "continent_rect": [
            [
                50128,
                17809
            ],
            [
                52304,
                22289
            ]
        ],
        "map_name": "A Simple Negotiation"
    },
    "1384": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 51,
        "type": "Instance",
        "floors": [
            51
        ],
        "region_id": 26,
        "region_name": "Fractals of the Mists",
        "continent_id": 2,
        "continent_name": "Mists",
        "map_rect": [
            [
                -12288,
                -12288
            ],
            [
                12288,
                12288
            ]
        ],
        "continent_rect": [
            [
                11204,
                4414
            ],
            [
                12228,
                5438
            ]
        ],
        "map_name": "Fractals of the Mists"
    },
    "1385": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 56,
        "type": "Instance",
        "floors": [
            56
        ],
        "region_id": 5,
        "region_name": "Tarnished Coast",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -21504,
                -46080
            ],
            [
                24576,
                49152
            ]
        ],
        "continent_rect": [
            [
                42112,
                32512
            ],
            [
                44032,
                36480
            ]
        ],
        "map_name": "Caledon Forest (Private)"
    },
    "1386": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 63,
        "type": "Instance",
        "floors": [
            63
        ],
        "region_id": 1,
        "region_name": "Shiverpeak Mountains",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -39936,
                -43008
            ],
            [
                39936,
                46080
            ]
        ],
        "continent_rect": [
            [
                55820,
                34936
            ],
            [
                59148,
                38648
            ]
        ],
        "map_name": "Thunderhead Peaks (Private)"
    },
    "1387": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 64,
        "type": "Public",
        "floors": [
            64
        ],
        "region_id": 4,
        "region_name": "Kryta",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -27648,
                -36864
            ],
            [
                30720,
                39936
            ]
        ],
        "continent_rect": [
            [
                48000,
                32256
            ],
            [
                50432,
                35456
            ]
        ],
        "map_name": "Bloodtide Coast (Public)"
    },
    "1388": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 58,
        "type": "Instance",
        "floors": [
            58
        ],
        "region_id": 1,
        "region_name": "Shiverpeak Mountains",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -49152,
                -24576
            ],
            [
                49152,
                24576
            ]
        ],
        "continent_rect": [
            [
                50432,
                27648
            ],
            [
                54528,
                29696
            ]
        ],
        "map_name": "Snowden Drifts (Private)"
    },
    "1389": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 58,
        "type": "Public",
        "floors": [
            58
        ],
        "region_id": 1,
        "region_name": "Shiverpeak Mountains",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -49152,
                -24576
            ],
            [
                49152,
                24576
            ]
        ],
        "continent_rect": [
            [
                50432,
                27648
            ],
            [
                54528,
                29696
            ]
        ],
        "map_name": "Snowden Drifts (Public)"
    },
    "1390": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 67,
        "type": "Public",
        "floors": [
            67
        ],
        "region_id": 2,
        "region_name": "Ascalon",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -39936,
                -33792
            ],
            [
                39936,
                33792
            ]
        ],
        "continent_rect": [
            [
                56576,
                24832
            ],
            [
                59904,
                27648
            ]
        ],
        "map_name": "Fireheart Rise (Public)"
    },
    "1391": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 57,
        "type": "Instance",
        "floors": [
            57
        ],
        "region_id": 5,
        "region_name": "Tarnished Coast",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -39936,
                -30720
            ],
            [
                43008,
                33792
            ]
        ],
        "continent_rect": [
            [
                38656,
                30848
            ],
            [
                42112,
                33536
            ]
        ],
        "map_name": "Brisban Wildlands (Private)"
    },
    "1392": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 5,
        "region_name": "Tarnished Coast",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -30720,
                -30720
            ],
            [
                30720,
                30720
            ]
        ],
        "continent_rect": [
            [
                37376,
                36094
            ],
            [
                39936,
                38654
            ]
        ],
        "map_name": "Primordus Rising"
    },
    "1393": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 65,
        "type": "Public",
        "floors": [
            65
        ],
        "region_id": 4,
        "region_name": "Kryta",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -15360,
                -30720
            ],
            [
                15360,
                30720
            ]
        ],
        "continent_rect": [
            [
                44928,
                25472
            ],
            [
                46208,
                28032
            ]
        ],
        "map_name": "Lake Doric (Public)"
    },
    "1394": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 64,
        "type": "Instance",
        "floors": [
            64
        ],
        "region_id": 4,
        "region_name": "Kryta",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -27648,
                -36864
            ],
            [
                30720,
                39936
            ]
        ],
        "continent_rect": [
            [
                48000,
                32256
            ],
            [
                50432,
                35456
            ]
        ],
        "map_name": "Bloodtide Coast (Private)"
    },
    "1395": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 63,
        "type": "Public",
        "floors": [
            63
        ],
        "region_id": 1,
        "region_name": "Shiverpeak Mountains",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -39936,
                -43008
            ],
            [
                39936,
                46080
            ]
        ],
        "continent_rect": [
            [
                55820,
                34936
            ],
            [
                59148,
                38648
            ]
        ],
        "map_name": "Thunderhead Peaks (Public)"
    },
    "1396": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 66,
        "type": "Public",
        "floors": [
            66
        ],
        "region_id": 4,
        "region_name": "Kryta",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -49152,
                -24576
            ],
            [
                52224,
                24576
            ]
        ],
        "continent_rect": [
            [
                46208,
                28672
            ],
            [
                50432,
                30720
            ]
        ],
        "map_name": "Gendarran Fields (Public)"
    },
    "1397": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 55,
        "type": "Public",
        "floors": [
            55
        ],
        "region_id": 5,
        "region_name": "Tarnished Coast",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -24576,
                -39936
            ],
            [
                27648,
                39936
            ]
        ],
        "continent_rect": [
            [
                39936,
                33536
            ],
            [
                42112,
                36864
            ]
        ],
        "map_name": "Metrica Province (Public)"
    },
    "1398": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 68,
        "type": "Public",
        "floors": [
            68
        ],
        "region_id": 2,
        "region_name": "Ascalon",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -36864,
                -36864
            ],
            [
                36864,
                36864
            ]
        ],
        "continent_rect": [
            [
                61440,
                32640
            ],
            [
                64512,
                35712
            ]
        ],
        "map_name": "Fields of Ruin (Public)"
    },
    "1399": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 57,
        "type": "Public",
        "floors": [
            57
        ],
        "region_id": 5,
        "region_name": "Tarnished Coast",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -39936,
                -30720
            ],
            [
                43008,
                33792
            ]
        ],
        "continent_rect": [
            [
                38656,
                30848
            ],
            [
                42112,
                33536
            ]
        ],
        "map_name": "Brisban Wildlands (Public)"
    },
    "1400": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 68,
        "type": "Instance",
        "floors": [
            68
        ],
        "region_id": 2,
        "region_name": "Ascalon",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -36864,
                -36864
            ],
            [
                36864,
                36864
            ]
        ],
        "continent_rect": [
            [
                61440,
                32640
            ],
            [
                64512,
                35712
            ]
        ],
        "map_name": "Fields of Ruin (Private)"
    },
    "1401": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 55,
        "type": "Instance",
        "floors": [
            55
        ],
        "region_id": 5,
        "region_name": "Tarnished Coast",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -24576,
                -39936
            ],
            [
                27648,
                39936
            ]
        ],
        "continent_rect": [
            [
                39936,
                33536
            ],
            [
                42112,
                36864
            ]
        ],
        "map_name": "Metrica Province (Private)"
    },
    "1402": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 65,
        "type": "Instance",
        "floors": [
            65
        ],
        "region_id": 4,
        "region_name": "Kryta",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -15360,
                -30720
            ],
            [
                15360,
                30720
            ]
        ],
        "continent_rect": [
            [
                44928,
                25472
            ],
            [
                46208,
                28032
            ]
        ],
        "map_name": "Lake Doric (Private)"
    },
    "1403": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 56,
        "type": "Public",
        "floors": [
            57,
            56
        ],
        "region_id": 5,
        "region_name": "Tarnished Coast",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -21504,
                -46080
            ],
            [
                24576,
                49152
            ]
        ],
        "continent_rect": [
            [
                42112,
                32512
            ],
            [
                44032,
                36480
            ]
        ],
        "map_name": "Caledon Forest (Public)"
    },
    "1404": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 67,
        "type": "Instance",
        "floors": [
            67
        ],
        "region_id": 2,
        "region_name": "Ascalon",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -39936,
                -33792
            ],
            [
                39936,
                33792
            ]
        ],
        "continent_rect": [
            [
                56576,
                24832
            ],
            [
                59904,
                27648
            ]
        ],
        "map_name": "Fireheart Rise (Private)"
    },
    "1405": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 66,
        "type": "Instance",
        "floors": [
            66
        ],
        "region_id": 4,
        "region_name": "Kryta",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -49152,
                -24576
            ],
            [
                52224,
                24576
            ]
        ],
        "continent_rect": [
            [
                46208,
                28672
            ],
            [
                50432,
                30720
            ]
        ],
        "map_name": "Gendarran Fields (Private)"
    },
    "1407": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 2,
        "type": "Instance",
        "floors": [
            1,
            3,
            2,
            0
        ],
        "region_id": 5,
        "region_name": "Tarnished Coast",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -30720,
                -30720
            ],
            [
                30720,
                30720
            ]
        ],
        "continent_rect": [
            [
                37376,
                36094
            ],
            [
                39936,
                38654
            ]
        ],
        "map_name": "Council Level"
    },
    "1408": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": -28,
        "type": "Instance",
        "floors": [
            -28,
            -26,
            -27
        ],
        "region_id": 20,
        "region_name": "Ring of Fire",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -46080,
                -46080
            ],
            [
                46080,
                46080
            ]
        ],
        "continent_rect": [
            [
                34718,
                39284
            ],
            [
                38558,
                43124
            ]
        ],
        "map_name": "Wildfire"
    },
    "1409": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 59,
        "type": "Instance",
        "floors": [
            59
        ],
        "region_id": 1,
        "region_name": "Shiverpeak Mountains",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -18432,
                -18432
            ],
            [
                18432,
                18432
            ]
        ],
        "continent_rect": [
            [
                51968,
                26112
            ],
            [
                53504,
                27648
            ]
        ],
        "map_name": "Dragonstorm (Private Squad)"
    },
    "1410": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 59,
        "type": "Instance",
        "floors": [
            59
        ],
        "region_id": 1,
        "region_name": "Shiverpeak Mountains",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -18432,
                -18432
            ],
            [
                18432,
                18432
            ]
        ],
        "continent_rect": [
            [
                51968,
                26112
            ],
            [
                53504,
                27648
            ]
        ],
        "map_name": "Champion's End"
    },
    "1411": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 59,
        "type": "Public",
        "floors": [
            59
        ],
        "region_id": 1,
        "region_name": "Shiverpeak Mountains",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -18432,
                -18432
            ],
            [
                18432,
                18432
            ]
        ],
        "continent_rect": [
            [
                51968,
                26112
            ],
            [
                53504,
                27648
            ]
        ],
        "map_name": "Dragonstorm (Public)"
    },
    "1412": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 59,
        "type": "Instance",
        "floors": [
            59
        ],
        "region_id": 1,
        "region_name": "Shiverpeak Mountains",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -18432,
                -18432
            ],
            [
                18432,
                18432
            ]
        ],
        "continent_rect": [
            [
                51968,
                26112
            ],
            [
                53504,
                27648
            ]
        ],
        "map_name": "Dragonstorm"
    },
    "1413": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 60,
        "type": "Public",
        "floors": [
            60,
            58
        ],
        "region_id": 1,
        "region_name": "Shiverpeak Mountains",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -21504,
                -58368
            ],
            [
                21504,
                58368
            ]
        ],
        "continent_rect": [
            [
                17664,
                13312
            ],
            [
                19456,
                18176
            ]
        ],
        "map_name": "The Twisted Marionette (Public)"
    },
    "1414": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 60,
        "type": "Instance",
        "floors": [
            60,
            58
        ],
        "region_id": 1,
        "region_name": "Shiverpeak Mountains",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -21504,
                -58368
            ],
            [
                21504,
                58368
            ]
        ],
        "continent_rect": [
            [
                17664,
                13312
            ],
            [
                19456,
                18176
            ]
        ],
        "map_name": "The Twisted Marionette (Private Squad)"
    },
    "1415": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            69,
            1
        ],
        "region_id": 37,
        "region_name": "Cantha",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -46080,
                -30720
            ],
            [
                46080,
                30720
            ]
        ],
        "continent_rect": [
            [
                25000,
                98100
            ],
            [
                28840,
                100660
            ]
        ],
        "map_name": "The Future in Jade: Power Plant"
    },
    "1416": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": -44,
        "type": "Instance",
        "floors": [
            -44
        ],
        "region_id": 37,
        "region_name": "Cantha",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -12288,
                -12288
            ],
            [
                12288,
                12288
            ]
        ],
        "continent_rect": [
            [
                23976,
                98110
            ],
            [
                25000,
                99134
            ]
        ],
        "map_name": "Deepest Secrets: Yong Reactor"
    },
    "1419": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            69,
            1
        ],
        "region_id": 37,
        "region_name": "Cantha",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -21504,
                -30720
            ],
            [
                24576,
                30720
            ]
        ],
        "continent_rect": [
            [
                21319,
                103145
            ],
            [
                23239,
                105705
            ]
        ],
        "map_name": "Isle of Reflection"
    },
    "1420": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            69,
            1
        ],
        "region_id": 37,
        "region_name": "Cantha",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -46080,
                -30720
            ],
            [
                46080,
                30720
            ]
        ],
        "continent_rect": [
            [
                25000,
                98100
            ],
            [
                28840,
                100660
            ]
        ],
        "map_name": "Fallout: Nika's Blade"
    },
    "1421": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            69,
            1
        ],
        "region_id": 37,
        "region_name": "Cantha",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -46080,
                -30720
            ],
            [
                46080,
                33792
            ]
        ],
        "continent_rect": [
            [
                21159,
                100457
            ],
            [
                24999,
                103145
            ]
        ],
        "map_name": "???"
    },
    "1422": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Public",
        "floors": [
            69,
            1,
            3,
            2,
            0
        ],
        "region_id": 37,
        "region_name": "Cantha",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -24576,
                -43008
            ],
            [
                27648,
                46080
            ]
        ],
        "continent_rect": [
            [
                33126,
                101838
            ],
            [
                35302,
                105550
            ]
        ],
        "map_name": "Dragon's End"
    },
    "1426": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            69,
            1
        ],
        "region_id": 37,
        "region_name": "Cantha",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -21504,
                -30720
            ],
            [
                24576,
                30720
            ]
        ],
        "continent_rect": [
            [
                21319,
                103145
            ],
            [
                23239,
                105705
            ]
        ],
        "map_name": "Isle of Reflection"
    },
    "1427": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            69,
            1
        ],
        "region_id": 37,
        "region_name": "Cantha",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -46080,
                -30720
            ],
            [
                46080,
                33792
            ]
        ],
        "continent_rect": [
            [
                21159,
                100457
            ],
            [
                24999,
                103145
            ]
        ],
        "map_name": "Lady Joon's Estate"
    },
    "1428": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Public",
        "floors": [
            69,
            1,
            3,
            2,
            0
        ],
        "region_id": 37,
        "region_name": "Cantha",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -46080,
                -30720
            ],
            [
                46080,
                30720
            ]
        ],
        "continent_rect": [
            [
                29185,
                100890
            ],
            [
                33025,
                103450
            ]
        ],
        "map_name": "Arborstone"
    },
    "1429": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            69,
            1
        ],
        "region_id": 37,
        "region_name": "Cantha",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -46080,
                -30720
            ],
            [
                46080,
                30720
            ]
        ],
        "continent_rect": [
            [
                29185,
                100890
            ],
            [
                33025,
                103450
            ]
        ],
        "map_name": "The Cycle, Reborn: Arborstone"
    },
    "1430": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 69,
        "type": "Instance",
        "floors": [
            69,
            1
        ],
        "region_id": 37,
        "region_name": "Cantha",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -21504,
                -30720
            ],
            [
                24576,
                30720
            ]
        ],
        "continent_rect": [
            [
                21319,
                103145
            ],
            [
                23239,
                105705
            ]
        ],
        "map_name": "Claiming the Isle of Reflection"
    },
    "1432": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 72,
        "type": "Instance",
        "floors": [
            72
        ],
        "region_id": 37,
        "region_name": "Cantha",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -3072,
                -3072
            ],
            [
                6144,
                6144
            ]
        ],
        "continent_rect": [
            [
                23600,
                102380
            ],
            [
                23984,
                102764
            ]
        ],
        "map_name": "Strike Mission: Aetherblade Hideout"
    },
    "1433": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            1
        ],
        "region_id": 1,
        "region_name": "Shiverpeak Mountains",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -18432,
                -24576
            ],
            [
                18432,
                27648
            ]
        ],
        "continent_rect": [
            [
                50432,
                31484
            ],
            [
                51968,
                33660
            ]
        ],
        "map_name": "Old Friends"
    },
    "1434": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            69,
            1
        ],
        "region_id": 37,
        "region_name": "Cantha",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -46080,
                -30720
            ],
            [
                46080,
                30720
            ]
        ],
        "continent_rect": [
            [
                29185,
                100890
            ],
            [
                33025,
                103450
            ]
        ],
        "map_name": "Empty"
    },
    "1435": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            69,
            1
        ],
        "region_id": 37,
        "region_name": "Cantha",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -21504,
                -30720
            ],
            [
                24576,
                30720
            ]
        ],
        "continent_rect": [
            [
                21319,
                103145
            ],
            [
                23239,
                105705
            ]
        ],
        "map_name": "Isle of Reflection"
    },
    "1436": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            69,
            1
        ],
        "region_id": 37,
        "region_name": "Cantha",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -46080,
                -30720
            ],
            [
                46080,
                30720
            ]
        ],
        "continent_rect": [
            [
                29185,
                100890
            ],
            [
                33025,
                103450
            ]
        ],
        "map_name": "Extraction Point: Command Quarters"
    },
    "1437": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 71,
        "type": "Instance",
        "floors": [
            71
        ],
        "region_id": 37,
        "region_name": "Cantha",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -24576,
                -43008
            ],
            [
                27648,
                46080
            ]
        ],
        "continent_rect": [
            [
                33126,
                101838
            ],
            [
                35302,
                105550
            ]
        ],
        "map_name": "Strike Mission: Harvest Temple"
    },
    "1438": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Public",
        "floors": [
            69,
            1,
            3,
            2,
            0
        ],
        "region_id": 37,
        "region_name": "Cantha",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -46080,
                -30720
            ],
            [
                46080,
                30720
            ]
        ],
        "continent_rect": [
            [
                25000,
                98100
            ],
            [
                28840,
                100660
            ]
        ],
        "map_name": "New Kaineng City"
    },
    "1439": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            69,
            1
        ],
        "region_id": 37,
        "region_name": "Cantha",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -24576,
                -43008
            ],
            [
                27648,
                46080
            ]
        ],
        "continent_rect": [
            [
                33126,
                101838
            ],
            [
                35302,
                105550
            ]
        ],
        "map_name": "The Only One"
    },
    "1440": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            69,
            1
        ],
        "region_id": 37,
        "region_name": "Cantha",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -24576,
                -43008
            ],
            [
                27648,
                46080
            ]
        ],
        "continent_rect": [
            [
                33126,
                101838
            ],
            [
                35302,
                105550
            ]
        ],
        "map_name": "Laying to Rest"
    },
    "1442": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Public",
        "floors": [
            69,
            1,
            3,
            2,
            0
        ],
        "region_id": 37,
        "region_name": "Cantha",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -46080,
                -30720
            ],
            [
                46080,
                33792
            ]
        ],
        "continent_rect": [
            [
                21159,
                100457
            ],
            [
                24999,
                103145
            ]
        ],
        "map_name": "Seitung Province"
    },
    "1444": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            69,
            1
        ],
        "region_id": 37,
        "region_name": "Cantha",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -21504,
                -30720
            ],
            [
                24576,
                30720
            ]
        ],
        "continent_rect": [
            [
                21319,
                103145
            ],
            [
                23239,
                105705
            ]
        ],
        "map_name": "Isle of Reflection"
    },
    "1445": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            69,
            1
        ],
        "region_id": 37,
        "region_name": "Cantha",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -46080,
                -30720
            ],
            [
                46080,
                30720
            ]
        ],
        "continent_rect": [
            [
                25000,
                98100
            ],
            [
                28840,
                100660
            ]
        ],
        "map_name": "The Future in Jade: Nahpui Lab"
    },
    "1446": {
        "min_level": 0,
        "max_level": 80,
        "default_floor": -53,
        "type": "Instance",
        "floors": [
            -53
        ],
        "region_id": 37,
        "region_name": "Cantha",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -15360,
                -15360
            ],
            [
                15360,
                15360
            ]
        ],
        "continent_rect": [
            [
                100,
                100
            ],
            [
                2148,
                2148
            ]
        ],
        "map_name": "Aetherblade Armada"
    },
    "1448": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            69,
            1
        ],
        "region_id": 37,
        "region_name": "Cantha",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -21504,
                -21504
            ],
            [
                24576,
                21504
            ]
        ],
        "continent_rect": [
            [
                43008,
                26240
            ],
            [
                44928,
                28032
            ]
        ],
        "map_name": "The Cycle, Reborn: The Dead End Bar"
    },
    "1449": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            69,
            1
        ],
        "region_id": 37,
        "region_name": "Cantha",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -46080,
                -30720
            ],
            [
                46080,
                33792
            ]
        ],
        "continent_rect": [
            [
                21159,
                100457
            ],
            [
                24999,
                103145
            ]
        ],
        "map_name": "Aurene's Sanctuary"
    },
    "1450": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 70,
        "type": "Instance",
        "floors": [
            70
        ],
        "region_id": 37,
        "region_name": "Cantha",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -46080,
                -30720
            ],
            [
                46080,
                30720
            ]
        ],
        "continent_rect": [
            [
                29185,
                100890
            ],
            [
                33025,
                103450
            ]
        ],
        "map_name": "Strike Mission: Xunlai Jade Junkyard"
    },
    "1451": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 73,
        "type": "Instance",
        "floors": [
            73
        ],
        "region_id": 37,
        "region_name": "Cantha",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -46080,
                -30720
            ],
            [
                46080,
                30720
            ]
        ],
        "continent_rect": [
            [
                25000,
                98100
            ],
            [
                28840,
                100660
            ]
        ],
        "map_name": "Strike Mission: Kaineng Overlook"
    },
    "1452": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Public",
        "floors": [
            69,
            1,
            3,
            2,
            0
        ],
        "region_id": 37,
        "region_name": "Cantha",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -46080,
                -30720
            ],
            [
                46080,
                30720
            ]
        ],
        "continent_rect": [
            [
                29185,
                100890
            ],
            [
                33025,
                103450
            ]
        ],
        "map_name": "The Echovald Wilds"
    },
    "1453": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            69,
            1
        ],
        "region_id": 37,
        "region_name": "Cantha",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -46080,
                -30720
            ],
            [
                46080,
                30720
            ]
        ],
        "continent_rect": [
            [
                25000,
                98100
            ],
            [
                28840,
                100660
            ]
        ],
        "map_name": "Ministry of Security: Main Office"
    },
    "1454": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            69,
            1
        ],
        "region_id": 37,
        "region_name": "Cantha",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -46080,
                -30720
            ],
            [
                46080,
                30720
            ]
        ],
        "continent_rect": [
            [
                25000,
                98100
            ],
            [
                28840,
                100660
            ]
        ],
        "map_name": "The Scenic Route: Kaineng Docks"
    },
    "1456": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 69,
        "type": "Instance",
        "floors": [
            69,
            1
        ],
        "region_id": 37,
        "region_name": "Cantha",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -21504,
                -30720
            ],
            [
                24576,
                30720
            ]
        ],
        "continent_rect": [
            [
                21319,
                103145
            ],
            [
                23239,
                105705
            ]
        ],
        "map_name": "Claiming the Isle of Reflection"
    },
    "1457": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            69,
            1
        ],
        "region_id": 37,
        "region_name": "Cantha",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -46080,
                -30720
            ],
            [
                46080,
                33792
            ]
        ],
        "continent_rect": [
            [
                21159,
                100457
            ],
            [
                24999,
                103145
            ]
        ],
        "map_name": "Detention Facility"
    },
    "1458": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            69,
            1
        ],
        "region_id": 37,
        "region_name": "Cantha",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -46080,
                -30720
            ],
            [
                46080,
                33792
            ]
        ],
        "continent_rect": [
            [
                21159,
                100457
            ],
            [
                24999,
                103145
            ]
        ],
        "map_name": "Aurene's Sanctuary"
    },
    "1459": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 69,
        "type": "Instance",
        "floors": [
            69,
            1
        ],
        "region_id": 37,
        "region_name": "Cantha",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -21504,
                -30720
            ],
            [
                24576,
                30720
            ]
        ],
        "continent_rect": [
            [
                21319,
                103145
            ],
            [
                23239,
                105705
            ]
        ],
        "map_name": "Claiming the Isle of Reflection"
    },
    "1460": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            69,
            1
        ],
        "region_id": 37,
        "region_name": "Cantha",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -46080,
                -30720
            ],
            [
                46080,
                33792
            ]
        ],
        "continent_rect": [
            [
                21159,
                100457
            ],
            [
                24999,
                103145
            ]
        ],
        "map_name": "Empress Ihn's Court"
    },
    "1461": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            69,
            1
        ],
        "region_id": 37,
        "region_name": "Cantha",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -46080,
                -30720
            ],
            [
                46080,
                33792
            ]
        ],
        "continent_rect": [
            [
                21159,
                100457
            ],
            [
                24999,
                103145
            ]
        ],
        "map_name": "Zen Daijun Hideaway"
    },
    "1462": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            69,
            1
        ],
        "region_id": 37,
        "region_name": "Cantha",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -21504,
                -30720
            ],
            [
                24576,
                30720
            ]
        ],
        "continent_rect": [
            [
                21319,
                103145
            ],
            [
                23239,
                105705
            ]
        ],
        "map_name": "Isle of Reflection"
    },
    "1463": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 69,
        "type": "Instance",
        "floors": [
            69,
            1
        ],
        "region_id": 37,
        "region_name": "Cantha",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -21504,
                -30720
            ],
            [
                24576,
                30720
            ]
        ],
        "continent_rect": [
            [
                21319,
                103145
            ],
            [
                23239,
                105705
            ]
        ],
        "map_name": "Claiming the Isle of Reflection"
    },
    "1464": {
        "min_level": 80,
        "max_level": 80,
        "default_floor": 1,
        "type": "Instance",
        "floors": [
            69,
            1
        ],
        "region_id": 37,
        "region_name": "Cantha",
        "continent_id": 1,
        "continent_name": "Tyria",
        "map_rect": [
            [
                -46080,
                -30720
            ],
            [
                46080,
                30720
            ]
        ],
        "continent_rect": [
            [
                29185,
                100890
            ],
            [
                33025,
                103450
            ]
        ],
        "map_name": "Fallout: Arborstone"
    }
}


const mapMap: { [index: string]: string } = {}

// some maps got multiple entries, this normalize the id to the first map with that name in the list
export function TranslateMapId(mapId: string) {
    if (mapMap[mapId]) {
        return mapMap[mapId]
    }
    let name = maps[mapId] ? maps[mapId].map_name : "Unknown";
    for (let key in maps) {
        if (maps[key].map_name === name) {
            mapMap[mapId] = key;
            return key;
        }
    }
    return mapId;
}

export default maps;